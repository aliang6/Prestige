import React, { Component } from 'react';
import WebsiteReputation from '../WebsiteReputation/WebsiteReputation.js';
import WriterLegitimacy from '../WriterLegitimacy/WriterLegitimacy.js';
import SentimentReport from '../SentimentReport/SentimentReport.js';
import ArticleSummary from '../ArticleSummary/ArticleSummary.js';
import "./Results.css";
import { CSSTransitionGroup } from 'react-transition-group';


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
        const back = document.getElementById('background-image');
        back.style.filter = 'blur(3px)';
        const contentBack = document.getElementById('content');
        contentBack.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        await fetch('/results', { 
            method: 'POST',
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify({ inputUrl: this.props.url }),
        }).then((res) => {
            console.log(res.status);
            console.log(res);
            if(res.status === 500 || res.ok === false){
                return false;
            }
            return res.json();
        }).then((json) => {
            if(json){
                this.report = JSON.parse(JSON.stringify(json));
                console.log(this.report);
                if(this.report.valid){
                    //setTimeout(() => this.setState({ loading: false, }), 4250);
                    this.setState({ loading: false });
                } else {
                    this.props.newSearch();
                }
            } else {
                this.props.newSearch();
            }
        });
    }

    componentDidMount() {
        this.retrieveJSON();
    }

    render() {
        if(this.state.loading) {
            return (
                <CSSTransitionGroup
                transitionName="loading"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={1000}
                >
                    <Loader />
                </CSSTransitionGroup>
            );
        } else {
            return (
                <div id="results-page">
                    <CSSTransitionGroup
                        transitionName="header"
                        transitionAppear={true}
                        transitionAppearTimeout={400}
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={1000}
                    >
                    <div>
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
                    </div>
                    </CSSTransitionGroup>
    
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
                            <CSSTransitionGroup
                                transitionName="content"
                                transitionAppear={true}
                                transitionAppearTimeout={750}
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={1000}
                            >
                            <SentimentReport
                                polarity={this.report.polarity}
                                polarity_confidence={this.report.polarity_confidence}
                                emotions={this.report.emotions}
                            />
                            </CSSTransitionGroup>
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