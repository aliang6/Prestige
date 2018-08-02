import React, { Component } from 'react';
import WebsiteReputation from '../WebsiteReputation/WebsiteReputation.js';
import WriterLegitimacy from '../WriterLegitimacy/WriterLegitimacy.js';
import SentimentReport from '../SentimentReport/SentimentReport.js';
import ArticleSummary from '../ArticleSummary/ArticleSummary.js';
import "./Results.css";


class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            webRepPage: true,
            wriLegPage: false,
            sentRepPage: false,
            artSumPage: false,
        };
        
        this.report = '';
        this.logoClick = this.logoClick.bind(this);
        this.webRepClick = this.webRepClick.bind(this);
        this.wriLegClick=this.wriLegClick.bind(this);
        this.sentRepClick = this.sentRepClick.bind(this);
        this.artSumClick = this.artSumClick.bind(this);
        this.retrieveJSON = this.retrieveJSON.bind(this);
    }

    logoClick(event) {
        event.preventDefault();
        this.props.newSearchClick(event);
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
            loaded: false,
            webRepPage: false,
            wriLegPage: false,
            sentRepPage: false,
            artSumPage: true,
        });
        console.log(this.state.webRepPage);
    }

    async retrieveJSON() {
        await fetch('/results', { 
        method: 'POST',
        headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ inputUrl: this.props.url }),
        }).then((res) => {
        return res.json();
        }).then((json) => {
        this.report = JSON.parse(JSON.stringify(json));
        });
        console.log(this.report);
        const back = document.getElementById('background-image');
        back.style.filter = 'grayscale(50%)';
        const contentBack = document.getElementById('content');
        contentBack.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        //setTimeout(() => this.setState({ loading: false, }), 4250);
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.retrieveJSON();
    }

    render() {
        if(this.state.loading) {
            return (
                <Loader />
            );
        } else {
            return (
                <div id="results-page">
                    <ul id="header-list">
                        <div id='header-logo'>
                            <HeaderButton
                                clickEvent={this.logoClick}
                                item='Prestige'
                                selected={false}
                            />
                        </div>
                        <div id='header-links'>
                            <HeaderButton 
                                clickEvent={this.webRepClick}
                                item='Website Reputation'
                                selected={this.state.webRepPage}
                            />
                            <div className="header-spacing"></div>
                            <HeaderButton 
                                clickEvent={this.wriLegClick}
                                item='Writer Legitimacy'
                                selected={this.state.wriLegPage}
                            />
                            <div className="header-spacing"></div>
                            <HeaderButton 
                                clickEvent={this.sentRepClick}
                                item='Sentiment Report'
                                selected={this.state.sentRepPage}
                            />
                            <div className="header-spacing"></div>
                            <HeaderButton 
                                clickEvent={this.artSumClick}
                                item='Article Summary'
                                selected={this.state.artSumPage}
                            />
                            <div className="header-spacing"></div>
                            <div id="new-analysis-button">
                                <HeaderButton 
                                    clickEvent={this.logoClick}
                                    item='New Analysis'
                                    selected={false}
                                />
                            </div>
                        </div>
                    </ul>
    
                    <div id="left-result-section">

                    </div>
    
                    <div id="middle-result-section">
                        {this.state.webRepPage && 
                            <WebsiteReputation 
                                reputation={this.report.website_reputation} 
                                rating={this.report.website_rating}
                                confidence={this.report.reputation_confidence}
                                url={this.report.web_url}
                            />
                        }
                        {this.state.wriLegPage && 
                            <WriterLegitimacy 
                                author_legitimacy={this.report.author_legitimacy} 
                                personality={this.report.author_legitimacy_percentiles}
                            />
                        }
                        {this.state.sentRepPage &&
                            <SentimentReport
                                polarity={this.report.polarity}
                                polarity_confidence={this.report.polarity_confidence}
                                emotions={this.report.emotions}
                            />
                        }
                        {this.state.artSumPage &&
                            <ArticleSummary
                                article = {this.report.article}
                                concepts = {this.report.main_concepts}
                            />
                        }
                    </div>
    
                    <div id="right-result-section">
                        
                    </div>
                </div>
            );
        }  
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
            <div className="hdr-btn">
                <li className="header-item">
                    {this.props.selected && 
                        <button className="header-selected" onClick={this.props.clickEvent}>
                            {this.props.item}
                        </button>
                    }
                    {!this.props.selected && 
                        <button className="header-button" onClick={this.props.clickEvent}>
                            {this.props.item}
                        </button>
                    }
                </li>
            </div>
        );
    }
}

class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <div className="breeding-rhombus-spinner">
                    <div className="rhombus child-1"></div>
                    <div className="rhombus child-2"></div>
                    <div className="rhombus child-3"></div>
                    <div className="rhombus child-4"></div>
                    <div className="rhombus child-5"></div>
                    <div className="rhombus child-6"></div>
                    <div className="rhombus child-7"></div>
                    <div className="rhombus child-8"></div>
                    <div className="rhombus big"></div>
                </div>
            </div>
        );
    }
}

export default Results;