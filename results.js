const express = require('express');
const request = require('request');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');
const PersonalityInsightV3 = require('watson-developer-cloud/personality-insights/v3');
const urlParse = require('url-parse');
const isUrl = require('is-url');
require('dotenv').config();

const router = express.Router();

var inputUrl = 'http://fortune.com/2018/07/23/elon-musk-tesla-spacex-pedo-guy-comment/'; // The user's inputted URL from '/index'
var pArr = []; // Array to hold promises
var cut = 0.5; // Cutoff for author legitimacy

// Legitimacy Variables
var website_rating = -1;
var website_reputation = '';
var reputation_confidence = '';
var author_legitimacy = 'None';
var polarity = '';
var polarity_confidence = '';
var validUrl = true;

// Web of Trust API Setup
var wotUrl = 'http://api.mywot.com/0.4/public_link_json?hosts='
var wotKey = process.env.WOT_KEY;
console.log(wotKey);

// Aylien API Setup
var aylienHeaders = {
  'X-AYLIEN-TextAPI-Application-Key': process.env.AYLIEN_KEY,
  'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_ID,
};
var aylienUrl = 'https://api.aylien.com/api/v1/';
var aylienExtractUrl = aylienUrl + 'extract';
var aylienSummarizeUrl = aylienUrl + 'summarize';
var aylienSentimentUrl = aylienUrl + 'sentiment';

var aylienExtractForm = {
  'url': '',
  'best_image': 'true',
  'language': 'auto',
}
var aylienSummarizeForm = {
  'url': '',
  'sentences_number': '5',
  'language': 'auto',
}
var aylienSentimentForm = {
  'url': '',
  'mode': 'document',
  'language': 'auto',
}

// IBM Watson Natural Language Understanding API Setup
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-03-16',
  username: process.env.WATSON_UN,
  password: process.env.WATSON_PN,
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});
var parameters = {
  'url': '',
  'features': {
    'concepts': {
      'limit': 3,
    },
    'emotion': {
      'document': true,
    },
    'sentiment': {
      'document': true,
    },
  },
  'return_analyzed_text': true
}

const watsonUserP = process.env.WATSON_UP;
const watsonPassP = process.env.WATSON_PP;

// IBM Watson Personality Insight API Setup
var personalityInsight = new PersonalityInsightV3({
  "version": "2017-10-13",
  "username": watsonUserP,
  "password": watsonPassP,
  "url": "https://gateway.watsonplatform.net/personality-insights/api",
});
var profileParams = {
  content: '',
  content_type: 'text/plain',
  consumption_preferences: true,
  raw_scores: true
};

// Extracted Article Variables
var title = '';
var author = '';
var full_article = '';
var main_image = '';
var summarized_article = '';
var word_count = -1;
var web_url = '';

// IBM Natural Language Understanding Variables
var concepts = '';
var emotions = '';

// IBM Personality Insight Variables
var openness = '';
var conscientiousness = '';
var extraversion = '';
var agreeableness = '';
var emotional_range = '';

// API Functions
function aylienExtract() { // Call Aylien to extract the article and verify if it is valid

  return pExtract();
}

function aylienAPI() { // Call Aylien to summarize and analyze the articles
  aylienSummarizeForm.url = inputUrl;
  aylienSentimentForm.url = inputUrl;
  aylienExtractForm.url = inputUrl;
  console.log("Aylien API");

  var pExtract =  new Promise((resolve, reject) => {
    request.post({ url: aylienExtractUrl, form: aylienExtractForm, headers: aylienHeaders }, (err, res, body) => {
      body = JSON.parse(body);
      title = body.title;
      author = body.author;
      full_article = body.article;
      main_image = body.image;
      console.log('full ' + full_article);
      if(full_article === undefined || full_article === ''){
        console.log('return1');
        validUrl = false;
        reject('No article');
      }
      resolve('Article retrieved');
    });
  });

  var pSummarize = new Promise((resolve, reject) => {
    request.post({ url: aylienSummarizeUrl, form: aylienSummarizeForm, headers: aylienHeaders }, (err, res, body) => {
      body = JSON.parse(body);
      summarized_article = body.sentences;
      if(body.sentences === undefined) {
        reject('pSummarize');
      }
      resolve('Data summarized');
    });
  });

  var pSentiment = new Promise((resolve, reject) => {
    request.post({ url: aylienSentimentUrl, form: aylienSentimentForm, headers: aylienHeaders }, (err, res, body) => {
      body = JSON.parse(body);
      polarity = body.polarity;
      polarity_confidence = body.polarity_confidence;
      if(body.polarity === undefined) {
        reject('pSentiment');
      }
      resolve('Sentiment analyzed');
    });
  });

  pArr.push(pExtract, pSummarize, pSentiment);
}

function naturalLanguageAPI() { // Call Watson Natural Language Understanding
  parameters.url = inputUrl;
  var pAnalyze = new Promise((resolve, reject) => {
    naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
      if (err) {
        console.log(err);
        reject('pAnalyze');
      }
      else {
        emotions = response.emotion.document.emotion;
        concepts = response.concepts;
      }
      resolve('Text analyzed');
    });
  });

  pArr.push(pAnalyze);
}

function pPersonality() { // Call Watson Personality Insight
  return new Promise((resolve, reject) => {
    profileParams.content = full_article;
    personalityInsight.profile(profileParams, function(error, profile) {
      if (error) {
        console.log(error);
        reject('pPersonality');
      }
      else {
        profile = JSON.parse(JSON.stringify(profile));
        word_count = profile.word_count;
        openness = profile.personality[0];
        conscientiousness = profile.personality[1];
        extraversion = profile.personality[2];
        agreeableness = profile.personality[3];
        emotional_range = profile.personality[4];
      }
      resolve('Personality analyzed');
    });
  });
}

function determineReputation() { // Call Web of Trust to Assess Website Reputation
  const options = { // Setup JSON for the request
    url: wotUrl + inputUrl + wotKey,
    method: 'GET',
    headers: {
    }
  };

  var pReputation = new Promise((resolve, reject) => {
    request.get(options, (err, response, body) => {
      let temp = new urlParse(inputUrl);
      console.log('Input url = ' + temp);
      web_url = temp.hostname;
      console.log('Web url = ' + web_url);
      console.log(body[0]);
      if(body[0] === '<' || !JSON.parse(body)[web_url] || !JSON.parse(body)[web_url]['0'] || !JSON.parse(body)[web_url]['0'][0]){
        website_reputation = 'Unknown';
        website_rating = 0;
        reputation_confidence = 0;
        console.log('return2');
        resolve('pReputation');
      } else {
        website_rating = JSON.parse(body)[web_url]['0'][0];
        reputation_confidence = JSON.parse(body)[web_url]['0'][1];
        if(website_rating === 0 )
          website_reputation = 'Unknown';
        else if(website_rating < 20)
          website_reputation = 'Very Poor';
        else if(website_rating < 40)
          website_reputation = 'Poor';
        else if(website_rating < 60)
          website_reputation = 'Unsatisfactory';
        else if(website_rating < 80)
          website_reputation = 'Good';
        else if(website_rating <= 100)
          website_reputation = 'Excellent';
        console.log(website_reputation);
        resolve('Reputation determined');
      }
    });
  });

  pArr.push(pReputation);
}

// Helper Function
function assessAuthorLegitimacy(){ // Algorithm to assess author legitimacy based off of personality
  // Opennness
  var open = openness.percentile >= cut;
  var imaginative = openness.children[3].percentile >= cut;
  var intellectual = openness.children[4].percentile >= cut;
  var liberal = openness.children[5].percentile >= cut;

  // Conscientiousness
  var conscientious = conscientiousness.percentile >= cut;
  var cautious = conscientiousness.children[1].percentile >= cut;
  var dutiful = conscientiousness.children[2].percentile >= cut;
  var confident = conscientiousness.children[4].percentile >= cut;

  // Extraversion
  var extrovert = extraversion.percentile >= cut;

  // Agreeableness
  var agreeable = agreeableness >= cut;
  var altruistic = agreeableness.children[0].percentile >= cut;
  var moral = agreeableness.children[3].percentile >= cut;

  // Emotional Range
  var emotional = emotional_range >= cut;
  var angry = emotional_range.children[0].percentile >= cut;
  var immoderate = emotional_range.children[3].percentile >= cut;

  console.log("Open: " + open);
  console.log("Imaginative: " + imaginative);
  console.log("Intellectual: " + intellectual);
  console.log("Liberal: " + liberal);
  console.log("Conscientous: " + conscientious);
  console.log("Cautious: " + cautious);
  console.log("Dutiful: " + dutiful);
  console.log("Confident: " + confident);
  console.log("Extrovert: " + extrovert);
  console.log("Agreeable: " + agreeable);
  console.log("Altruistic: " + altruistic);
  console.log("Moral: " + moral);
  console.log("Emotional: " + emotional);
  console.log("Angry: " + angry);
  console.log("Immoderate: " + immoderate);

  var score = 0;
  // Scores assigned based off of Watson's Personality Dimensions
  if(open)
    score += 6; // 10101111
  else
    score -= 2; // 0-1--1-1
  if(emotional)
    score -= 1; // 0-0-0010
  else
    score += 4; // 10100011
  if(extrovert)
    score += 0; // 1-1--100
  else
    score -= 1; // -010-01-
  if(conscientious)
    score += 6; // 10110111
  else
    score -= 4 // 1----00-
  if(agreeable)
    score += 5 // 11001110
  else
    score -= 6 // 0--0--0-

  // Trustworthy Traits
  if(!imaginative) { score += 1 };
  if(intellectual) { score += 1 };
  if(!liberal) { score += 1 };
  if(cautious) { score += 1 };
  if(dutiful) { score += 1 };
  if(altruistic) { score += 1 };
  if(moral) { score += 1 };
  if(!angry) { score += 1 };
  if(!immoderate) { score += 1 };

  // Untrustworthy Traits
  if(imaginative) { score -= 1 };
  if(liberal) { score -= 1 };
  if(!cautious) { score -= 1 };
  if(!dutiful) { score -= 1 };
  if(!moral) { score -= 1 };
  if(angry) { score -= 1 };
  if(immoderate) { score -= 1 };
  console.log("Score " + score);

  if(score <= -4)
    author_legitimacy = "Untrustworthy";
  else if(score < 0)
    author_legitimacy = "Questionable";
  else if(score < 6)
    author_legitimacy = "Neutral";
  else
    author_legitimacy = "Trustworthy";
}

function createReport() { // Create a JSON report with all the information to display in the frontss end
  const jsonReport = {
    "valid": true,
    "web_url": web_url,
    "website_reputation": website_reputation,
    "website_rating": website_rating,
    "reputation_confidence": reputation_confidence,
    "author_legitimacy": author_legitimacy,
    "author_legitimacy_percentiles": {
      "openness": openness.percentile,
      "conscientiousness": conscientiousness.percentile,
      "extraversion": extraversion.percentile,
      "agreeableness": agreeableness.percentile,
      "emotional_range": emotional_range.percentile,
      "imagination": openness.children[3].percentile,
      "intellect": openness.children[4].percentile,
      "liberalism": openness.children[5].percentile,
      "cautiousness": conscientiousness.children[1].percentile,
      "dutifulness": conscientiousness.children[2].percentile,
      "self_efficacy": conscientiousness.children[4].percentile,
      "altruism": agreeableness.children[0].percentile,
      "morality": agreeableness.children[3].percentile,
      "anger": emotional_range.children[0].percentile,
      "immoderation": emotional_range.children[3].percentile,
    },
    "polarity": polarity,
    "polarity_confidence": polarity_confidence,
    "article": {
        "title": title,
        "author": author,
        "full_article": full_article,
        "main_image": main_image,
        "summarized_article": summarized_article,
        "word_count": word_count,
        "article_link": inputUrl,
    },
    "main_concepts": concepts,
    "emotions": emotions,
  }
  return jsonReport;
}

function createFakeReport() { // Fake JSON Report for Styling Purposes
  const jsonReport = {
    valid: 'true',
    web_url: 'www.fortunedotcom.files.wordpress.com',
    website_reputation: 'Excellent',
    website_rating: 88,
    reputation_confidence: 85,
    author_legitimacy: 'Neutral',
    author_legitimacy_percentiles: {
      openness: 0.9819202376654581,
      conscientiousness: 0.4281304686668319,
      extraversion: 0.43850331181112706,
      agreeableness: 0.17403147414540437,
      emotional_range: 0.7806533353976652,
      imagination: 0.6047699215836906,
      intellect: 0.9972153247876092,
      liberalism: 0.980463993481399,
      cautiousness: 0.8617686166688678,
      dutifulness: 0.6805628018545951,
      self_efficacy: 0.4987780113303312,
      altruism: 0.8885333272943423,
      morality: 0.47914236327575016,
      anger: 0.24742429254664466,
      immoderation: 0.0363953123115609
    },
    polarity: 'positive',
    polarity_confidence: 0.9301188588142395,
    article: {
      title: 'Commentary: Is Elon Musk Too Volatile to Run Tesla and SpaceX?',
      author: 'Leon Vanstone',
      full_article: 'Elon Musk has had an interesting few months in the public spotlight, from arguing over royalties for a farting unicorn to accusing a national hero of being a pedophile on Twitter. His behavior within the boardroom seems equally unusual. In a slightly bizarre May conference call, he told investors in Tesla that if they “are concerned about volatility, they should definitely not buy our stock.” To no one’s surprise, Tesla’s share price fell sharply.\n\nWhile investors are justified in worrying about the volatility of the Tesla share price, the more important question may be whether Musk himself is too volatile to run Tesla and SpaceX, the very companies that he founded. Would removing their high-profile CEO be the right move?\n\nTo begin answering this question, we need to remember that SpaceX and Tesla owe much of their success to Musk. To build Tesla, Musk convinced the general public that electric cars were trendy. And with SpaceX, Musk arguably helped to reignite the public’s fascination with space. It was his personality, his branding, and the hype he managed to build around these ventures that resulted in them becoming so popular. Many of the people who invested in his companies did so because ultimately they believed in Musk.\n\nIn this context, removing Musk could be disastrous for the companies he founded—similar to Apple’s struggles after ousting Steve Jobs. There are now many competitors within both the electric car and space transport sectors, and without Musk, SpaceX and Tesla might simply blend in with the rest.\n\nYet despite how essential he is to his companies, Musk is increasingly drawing negative attention to himself in the public eye—which is likely to lead to even more gaffes that are damaging to his companies. And while Musk’s volatility seems to be causing Tesla’s share price the most damage, it is potentially much more problematic for SpaceX.\n\nGoing to space isn’t cheap. The NASA shuttle program cost about $200 billion, and the International Space Station, including other nations’ contributions, cost about $150 billion (through 2015). NASA’s fiscal year 2017 budget was nearly $20 billion.\n\nBudgets of this size must be approved by Congress. Politicians are very interested in getting reelected, and might not want to risk being associated with someone like Musk. In addition, SpaceX directly deals with NASA, a government agency that is famously risk-averse.\n\nA large amount of SpaceX’s revenue comes from government contracts. Musk could be in trouble if the government follows his advice: If you’re concerned about volatility, then don’t buy.\n\nSpaceX is not the only private company launching rockets. If Musk’s public behavior continues along this negative trend, SpaceX may well be forced to distance itself from its founder in order to save its contracts. Without government support, SpaceX would likely collapse rapidly.\n\nTesla and SpaceX have found themselves in a difficult predicament. Musk is far too important to his companies to be removed completely. But if he continues to behave inappropriately, the boards of directors should consider publicly censuring him and demanding a change in behavior. If they don’t begin to take serious action now, they might soon come to find that they’ve lost control of their CEO entirely.\n\nLeon Vanstone is a researcher at the University of Texas and science communicator in Austin.',
      main_image: 'https://fortunedotcom.files.wordpress.com/2018/07/elon-musk.jpg',
      summarized_article:
        [ 'While investors are justified in worrying about the volatility of the Tesla share price, the more important question may be whether Musk himself is too volatile to run Tesla and SpaceX, the very companies that he founded.',
          'And with SpaceX, Musk arguably helped to reignite the public’s fascination with space.',
          'There are now many competitors within both the electric car and space transport sectors, and without Musk, SpaceX and Tesla might simply blend in with the rest.',
          'And while Musk’s volatility seems to be causing Tesla’s share price the most damage, it is potentially much more problematic for SpaceX.',
          'If Musk’s public behavior continues along this negative trend, SpaceX may well be forced to distance itself from its founder in order to save its contracts.' ],
      word_count: 556,
      article_link: 'http://fortune.com/2018/07/23/elon-musk-tesla-spacex-pedo-guy-comment/',
    },
    main_concepts:
    [ { text: 'Elon Musk',
        relevance: 0.988617,
        dbpedia_resource: 'http://dbpedia.org/resource/Elon_Musk' },
      { text: 'International Space Station',
        relevance: 0.985707,
        dbpedia_resource: 'http://dbpedia.org/resource/International_Space_Station' },
      { text: 'Space Shuttle',
        relevance: 0.970741,
        dbpedia_resource: 'http://dbpedia.org/resource/Space_Shuttle' } ],
    emotions: {
      sadness: 0.560796,
      joy: 0.481088,
      fear: 0.437122,
      disgust: 0.116991,
      anger: 0.162048
    },
  }
  return jsonReport;
}

// GET Results Page
/*router.get('/', (req, res, next) => {
  const report = createReport();
  console.log(report);
  res.send(report);

  var pExtract = aylienExtract();
    aylienAPI();
    naturalLanguageAPI();
    determineReputation();

    pExtract().then(()=>{
      Promise.all(pArr).then(() => {
        if(validUrl){
          console.log('inval1');
          return pPersonality();
        }
      }).then(() => {
        if(validUrl){
          console.log('inval2');
          assessAuthorLegitimacy();
          report = createReport();
          res.send(report);
        }
      }).catch((err) => {
        console.log('Catch error' + err);
        res.send(report);
      });
    });
});*/

// POST Results Page
/*router.post('/', (req, res) => {
  var report = {"valid": false};
  inputUrl = req.body.inputUrl;
  console.log('input url = ' + inputUrl);
  const goodUrl = isUrl(inputUrl);
  console.log('isUrl = ' + goodUrl);
  if(isUrl(inputUrl)){
    aylienAPI();
    naturalLanguageAPI();
    determineReputation();

    Promise.all(pArr).then(() => {
      if(validUrl){
        console.log('inval1');
        return pPersonality();
      }
    }).then(() => {
      if(validUrl){
        console.log('inval2');
        assessAuthorLegitimacy();
        report = createReport();
        res.send(report);
      }
    }).catch((err) => {
      console.log('Catch error' + err);
      res.send(report);
    });
  } else {
    res.send(report);
  }
});*/

function retrieveReport(input) {
  inputUrl = input;
  console.log(inputUrl);
  var report = {"valid": false};
  console.log('input url = ' + inputUrl);
  const goodUrl = isUrl(inputUrl);
  console.log('isUrl = ' + goodUrl);
  if(isUrl(inputUrl)){
    aylienAPI();
    naturalLanguageAPI();
    determineReputation();

    Promise.all(pArr).then(() => {
      if(validUrl){
        console.log('inval1');
        return pPersonality();
      }
    }).then(() => {
      if(validUrl){
        console.log('inval2');
        assessAuthorLegitimacy();
        report = createReport();
        return report;
      }
    }).catch((err) => {
      console.log('Catch error' + err);
      return report;
    });
  } else {
    return report;
  }

}

function retrieveFakeReport() {
  var report = createFakeReport();
  console.log(report);
  return report;
}

/* router.post('/', (req, res) => {
  var report = createFakeReport();
  console.log(report);
  res.send(report);
}); */

module.exports = {
  retrieveReport: async function retrieveReport(input){
    return new Promise((resolve, reject) => {
      inputUrl = input;
      console.log(inputUrl);
      var report = {"valid": false};
      console.log('input url = ' + inputUrl);
      const goodUrl = isUrl(inputUrl);
      console.log('isUrl = ' + goodUrl);
      if(goodUrl){
        aylienAPI();
        naturalLanguageAPI();
        determineReputation();

        Promise.all(pArr).then(() => {
          if(validUrl){
            console.log('inval1');
            return pPersonality();
          }
        }).then(() => {
          if(validUrl){
            console.log('inval2');
            assessAuthorLegitimacy();
            report = createReport();
            console.log('1');
            resolve(report);
            console.log('2');
            return;
          }
        }).catch((err) => {
          console.log('Catch error' + err);
          resolve(report);
          reject('Retrieve Report reject');
        });
      } else {
        resolve(report);
      }
    });
  },
  retrieveFakeReport: () => {
    var report = createFakeReport();
    console.log('retrieved');
    return report;
  },
}
