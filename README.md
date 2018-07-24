# Prestige
Analyze articles and receive legitimacy reports and succinct summaries.

## Audience
People who want to analyze and/or summarize text. Useful for writers checking for article bias or readers checking for the legitimacy of an article on a website.

## Experience
The user signs up, logs into the webpage, and sees the options to analyze, summarize, or translate. Clicking one will allow them to input text or urls with options to refine their intentions. They then press a button to analyze their inputs and are returned with understandable and visually appealing results. They can save their results which will be used to recommend articles that may be of potential interest in the future.

# Technical
## Models
- User
- Document
- Results

## Views
- Index/Home
- Sign Up
- Log In
- Text/URL Input
- Result
- Past Analysis

## Routes
- Index/Home
  - GET <span></span>www.prestige.com/
- Signup
  - GET <span></span>www.prestige.com/signup
  - POST <span></span>www.prestige.com/signup
- Login
  - GET <span></span>www.prestige.com/login
  - POST <span></span>www.prestige.com/login
- Result
  - GET <span></span>www.prestige.com/result
  - POST <span></span>www.prestige.com/results
- Past Searches
  - GET <span></span>www.prestige.com/past

## Features
- Input for text and links
- Filters for intentions
- Results page with analysis and summary
- Option to translate the article and its summary
- Option to see current trending news/topics

## Languages
#### Front-End
* HTML
* CSS
* Bootstrap
#### Back-End
* JavaScript
* jQuery
* React
* Node.js
* Express.js
* MongoDB
* IBM Watson Natural Language Classifier, Natural Language Understanding, Tone Analyzer, Language Translator, and Text to Speech
* WebKnox Text-Processing, Words, 
* Google Cloud Natural Language
* Microsoft Azure
* Traitify
* Aylien

## Planning
- Week One
  - Monday July 23, 2018
    - Design document
    - Node.js, MongoDB, and API setup
  - Tuesday July 24, 2018
    - Experiment with APIs and learn their calls
    - Create the user data model
    - Implement sign-up login feature and views
  - Wednesday July 25, 2018
    - Create front end skeleton
    - Receive data from the APIs
    - Create the results data model
  - Thursday July 26, 2018
    - Have working functionality for analyze, summarize, and translate
  - Friday July 27, 2018
    - Complete MVP
    - Start adding additional features such as alternate article recommendations and correction suggestions
- Week Two
  - Monday July 30, 2018
    - Continue and potentially complete working on adding additional features
    - Connect the front end with the back end
  - Tuesday July 31, 2018
    - Start working on the front end design
    - Visually represent the analysis and results
  - Wednesday August 1, 2018
    - Continue working on the front end design
    - Optimize the web page for mobile devices
  - Thursday August 2, 2018
    - Refine the design and edge cases
    - Complete the project and upload it to a web server
  - Friday August 3, 2018

- Week Three
  - Monday August 6, 2018
  - Tuesday August 7, 2018
  - Wednesday August 8, 2018
  - Thursday August 9, 2018
  - Friday August 10, 2018
  - Saturday August 11, 2018
    - Demo
