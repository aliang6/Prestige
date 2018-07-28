import React, { Component } from 'react';
import WebsiteReputation from '../WebsiteReputation/WebsiteReputation.js';
import WriterLegitimacy from '../WriterLegitimacy/WriterLegitimacy.js';
import SentimentReport from '../SentimentReport/SentimentReport.js';
import ArticleSummary from '../ArticleSummary/ArticleSummary.js';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webRepPage: true,
            wriLegPage: false,
            sentRepPage: false,
            artSumPage: false,
        };

        this.logoClick = this.logoClick.bind(this);
        this.webRepClick = this.webRepClick.bind(this);
        this.wriLegClick=this.wriLegClick.bind(this);
        this.sentRepClick = this.sentRepClick.bind(this);
        this.artSumClick = this.artSumClick.bind(this);
    }

    logoClick(event) {
        event.preventDefault();
    }

    webRepClick(event) {
        event.preventDefault();
        this.setState({
            webRepPage: true,
            wriLegPage: false,
            sentRepPage: false,
            artSumPage: false,
        });
        console.log(this.state.webRepPage);
    }
    
    wriLegClick(event) {
        event.preventDefault();
        this.setState({
            webRepPage: false,
            wriLegPage: true,
            sentRepPage: false,
            artSumPage: false,
        });
        console.log(this.state.webRepPage);
    }

    sentRepClick(event) {
        event.preventDefault();
        this.setState({
            webRepPage: false,
            wriLegPage: false,
            sentRepPage: true,
            artSumPage: false,
        });
    }

    artSumClick(event) {
        event.preventDefault();
        this.setState({
            webRepPage: false,
            wriLegPage: false,
            sentRepPage: false,
            artSumPage: true,
        });
        console.log(this.state.webRepPage);
    }
    

    render() {
        return (
            <div id="results-page">
                <ul id="header">
                    <div id='logo-header'>
                        <HeaderButton
                            clickEvent={this.logoClick}
                            item='Prestige'
                        />
                    </div>
                    <HeaderButton 
                        clickEvent={this.webRepClick}
                        item='Website Reputation'
                    />
                    <HeaderButton 
                        clickEvent={this.wriLegClick}
                        item='Writer Legitimacy'
                    />
                    <HeaderButton 
                        clickEvent={this.sentRepClick}
                        item='Sentiment Report'
                    />
                    <HeaderButton 
                        clickEvent={this.artSumClick}
                        item='Article Summary'
                    />
                </ul>

                {this.state.webRepPage && 
                    <WebsiteReputation 
                        reputation={this.props.report.website_reputation} 
                        url="https://"
                    />
                }
                {this.state.wriLegPage && 
                    <WriterLegitimacy 
                        author_legitimacy={this.props.report.author_legitimacy} 
                        emotions={this.props.report.author_legitimacy_percentiles}
                    />
                }
                {this.state.sentRepPage &&
                    <SentimentReport
                        polarity={this.props.report.polarity}
                        polarity_confidence={this.props.report.polarity_confidence}
                        emotions={this.props.report.emotions}
                    />
                }
                {this.state.artSumPage &&
                    <ArticleSummary
                        article = {this.props.report.article}
                        concepts = {this.props.report.main_concepts}
                    />
                }
                
                {/* <h1>{this.props.report.article.title}</h1>
                <h4>{this.props.report.article.author}</h4>
                <h2>Website Reputation: {this.props.report.website_reputation}</h2>
                <h4>Website Rating: {this.props.report.website_rating}</h4>
                <h2>Author Legitimacy: {this.props.report.author_legitimacy}</h2>
                <img id="article-picture" src={"this.props.report.article.main_image"} alt="{this.props.report.article.main_image}"/>
                <h2>Sentiment</h2>
                <h6>Polarity: {this.props.report.polarity} with {this.props.report.polarity_confidence} confidence</h6>
                <h2>Summarized Article</h2>
                <ul>
                    {#each this.props.report.article.summarized_article}
                    <li>{this}</li>
                    {/each}
                </ul>
                <h2>Extracted Concepts</h2>
                <ul>
                    {#each this.props.report.main_concepts as |concept|}
                    <li><a href="{concept.dbpedia_resource}">{concept.text}</a> with {concept.relevance} relevance</li>
                    {/each}
                </ul>
                <h2>Emotions</h2>
                <ul>
                    <li>Sadness: {this.props.report.emotions.sadness}</li>
                    <li>Joy: {this.props.report.emotions.joy}</li>
                    <li>Fear: {this.props.report.emotions.fear}</li>
                    <li>Disgust: {this.props.report.emotions.disgust}</li>
                    <li>Anger: {this.props.report.emotions.anger}</li>
                </ul>
                <p>{this.props.report.article.full_article}</p> */}
                <button onClick={this.props.newSearchClick}>New Search</button>;
            </div>
        );
    };
}

class HeaderButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="header-button">
                <li className="header-item">
                    <button onClick={this.props.clickEvent}>{this.props.item}</button>
                </li>
            </div>
        );
    }
}

export default Results;