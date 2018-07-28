import React, { Component } from 'react';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="results-page">
                <ul id="header">
                    <li class="header-item">Prestige</li>
                    <li class="header-item">Website Reputation</li>
                    <li class="header-item">Author Analysis</li>
                    <li class="header-item">Sentiment Analysis</li>
                    <li class="header-item">Article Analysis</li>
                </ul>
                <h1>{this.props.report.article.title}</h1>
                <h4>{this.props.report.article.author}</h4>
                <h2>Website Reputation: {this.props.report.website_reputation}</h2>
                <h4>Website Rating: {this.props.report.website_rating}</h4>
                <h2>Author Legitimacy: {this.props.report.author_legitimacy}</h2>
                <img id="article-picture" src={"this.props.report.article.main_image"} alt="{this.props.report.article.main_image}"/>
                <h2>Sentiment</h2>
                <h6>Polarity: {this.props.report.polarity} with {this.props.report.polarity_confidence} confidence</h6>
                <h2>Summarized Article</h2>
                {/* <ul>
                    {#each this.props.report.article.summarized_article}
                    <li>{this}</li>
                    {/each}
                </ul> */}
                <h2>Extracted Concepts</h2>
                {/* <ul>
                    {#each this.props.report.main_concepts as |concept|}
                    <li><a href="{concept.dbpedia_resource}">{concept.text}</a> with {concept.relevance} relevance</li>
                    {/each}
                </ul> */}
                <h2>Emotions</h2>
                <ul>
                    <li>Sadness: {this.props.report.emotions.sadness}</li>
                    <li>Joy: {this.props.report.emotions.joy}</li>
                    <li>Fear: {this.props.report.emotions.fear}</li>
                    <li>Disgust: {this.props.report.emotions.disgust}</li>
                    <li>Anger: {this.props.report.emotions.anger}</li>
                </ul>
                <p>{this.props.report.article.full_article}</p>
                <button onClick={this.props.onButtonClick}>New Search</button>;
            </div>
        );
    };
}

export default Results;