import React, { Component } from 'react';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: '',
        };
    }

    componentDidMount(){
        fetch('/results').then((res) => {
            return res.json();
          }).then((json) => {
            console.log(json);
            this.setState({
              report: JSON.parse(JSON.stringify(json)),
            })
            console.log(this.state.report);
          }).catch((err) => {
            console.log(err);
          });
    };

    render() {
        return (
            <div>
                <h1>{this.state.report.article.title}</h1>
                <h4>{this.state.report.article.author}</h4>
                <h2>Website Reputation: {this.state.report.website_reputation}</h2>
                <h4>Website Rating: {this.state.report.website_rating}</h4>
                <h2>Author Legitimacy: {this.state.report.author_legitimacy}</h2>
                <img id="article-picture" src="{this.state.report.article.main_image}" alt="{this.state.report.article.main_image}"/>
                <h2>Sentiment</h2>
                <h6>Polarity: {this.state.report.polarity} with {this.state.report.polarity_confidence} confidence</h6>
                <h2>Summarized Article</h2>
                {/* <ul>
                    {#each this.state.report.article.summarized_article}
                    <li>{this}</li>
                    {/each}
                </ul> */}
                <h2>Extracted Concepts</h2>
                {/* <ul>
                    {#each this.state.report.main_concepts as |concept|}
                    <li><a href="{concept.dbpedia_resource}">{concept.text}</a> with {concept.relevance} relevance</li>
                    {/each}
                </ul> */}
                <h2>Emotions</h2>
                <ul>
                    <li>Sadness: {this.state.report.emotions.sadness}</li>
                    <li>Joy: {this.state.report.emotions.joy}</li>
                    <li>Fear: {this.state.report.emotions.fear}</li>
                    <li>Disgust: {this.state.report.emotions.disgust}</li>
                    <li>Anger: {this.state.report.emotions.anger}</li>
                </ul>
                <p>{this.state.report.article.full_article}</p>
            </div>
        );
    };
}

export default Results;