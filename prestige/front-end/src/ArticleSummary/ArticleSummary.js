import React, {Component} from 'react';
import './ArticleSummary.css';
import {HorizontalBar} from 'react-chartjs-2';
import sweetalert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactTooltip from 'react-tooltip';

const Swal = withReactContent(sweetalert);

const backColor = 'rgba(0, 0, 0, 0.6)'
const hoverBackColor = 'rgba(0, 0, 0, 0.8)'
const borderColor = 'rgba(255, 215, 0, 1)';

class ArticleSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFullArticle: false,
        }
        this.displayFullArticle = this.displayFullArticle.bind(this);
    }

    displayFullArticle(event) {
        event.preventDefault();
        Swal.fire({
            title: this.props.article.title,
            text: '(Written by ' + this.props.article.author + ') \n' + this.props.article.full_article,
            imageUrl: this.props.article.main_image,
            width: '70%',
            customClass: 'fullArticle',
            animation: false,
            buttonStyling: false,
            confirmButtonClass: 'confirmBtn',
            confirmButtonColor: '#000000d9',
            confirmButtonText: 'Close full article',

        });
    }

    closeFullArticle(event) {
        event.preventDefault();
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="content"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={1000}
            >
            <div className="art-sum">
                <div className="art-text">
                    <h1 className="art-sum-text">Article Summary</h1>
                    <h3 className="art-title-text">Article Title: <span className="art-title-prop">{this.props.article.title}</span></h3>
                </div>
                <div className="main-section">
                    <div className="con-rel-text">
                        <div className="concept-text">
                            <h3>Main Concepts and Relevance</h3>
                            <a data-tip data-for='rel-help' className="help-logo"><ion-icon name="help-circle-outline" size="small"></ion-icon></a>
                            <ReactTooltip id='rel-help' place="top" type="dark" effect="solid">
                                <p className='help-text'>Higher relevance represents a higher stastical chance of the concept being important in the article.</p>
                            </ReactTooltip>
                        </div>
                        <div className="summary-text">
                            <h3>Summary</h3>
                        </div>
                    </div>
                    <div className="summary">
                        <div className="con-rel-section">
                            <MainConcepts concepts={this.props.concepts} />
                        </div>
                        <div className="sum-section">
                            <SummarizedArticle 
                                article={this.props.article} 
                                displayFullArticle={this.displayFullArticle} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            </CSSTransitionGroup>
        );
    }
}

class FullArticle extends Component {
    render() {
        return (
            <div className="full-article-comp">
                <h1>{this.props.title}</h1>
                <h3>{this.props.writer}</h3>
                <img src={this.props.image} alt={this.props.image} />
                <p>{this.props.fullArticle}</p>
            </div>
        );
    }
}

class SummarizedArticle extends Component {
    constructor(props){
        super(props);
        this.listSentences = this.props.article.summarized_article.map(
            (sentence, index) => <li key={index} className="summary-sentence" >{sentence}</li>
        );
    }

    render() {
        return (
            <div className="summary-text-list">
                <div>
                    <ul className="summary-list">
                        {this.listSentences}
                    </ul>
                    <button className="full-art-btn" onClick={this.props.displayFullArticle}>Display Full Article</button>
                </div>
            </div>
        );
    }
}

class MainConcepts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="concept-section">
                {this.props.concepts &&
                <div>
                    <ul className="concept-list">
                        <ConceptTopic concept={this.props.concepts[0]} back_color='rgba(255, 215, 0, .65)' hover_color='rgba(255, 215, 0, .85)' border_color='rgba(255, 215, 0, 1)' />
                        <ConceptTopic concept={this.props.concepts[1]} back_color='rgba(192, 192, 192, .65)' hover_color='rgba(192, 192, 192, .85)' border_color='rgba(192, 192, 192, 1)' />
                        <ConceptTopic concept={this.props.concepts[2]} back_color='rgba(205, 127, 50, .65)' hover_color='rgba(205, 127, 50, .85)' border_color='rgba(205, 127, 50, 1)' />
                    </ul>
                </div>
                }
                {!this.props.concepts &&
                <div>
                    <ul className="concept-list">

                    </ul>
                </div>
                }
            </div>
        );
    }
}

class ConceptTopic extends Component {
    constructor(props){
        super(props);
        this.data = {
            labels: [],
            datasets: [{
                label: '',
                data: [this.props.concept.relevance * 100],
                backgroundColor: [
                    this.props.back_color,
                    backColor,
                ],
                hoverBackgroundColor: [
                    this.props.hover_color,,
                    hoverBackColor,
                ],
                borderColor: [
                    this.props.border_color,
                    'rgba(110, 20, 6, 1)',
                ],
            }],
        };
        this.options = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontSize: 10, 
                        fontFamily: "'Roboto', sans-serif", 
                        fontColor: 'rgba(255, 255, 255, 0.85)',
                        fontStyle: 'normal',
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontFamily: "'Roboto', sans-serif", 
                        fontColor: 'rgba(255, 255, 255, 0.85)',
                        fontStyle: 'normal',
                    }
                }],
                ticks: {
                    fontColor: 'rgba(255, 255, 255, 0.9)',
                }
            },
            
        }
    }

    render() {
        return (
            <div className='concept-name'>
                <div className="concept-topic">
                    <li><a target="_blank" class="con-link" href={this.props.concept.dbpedia_resource}>{this.props.concept.text}</a></li>
                </div>
                <div className="donut-graph">
                    <HorizontalBar
                        ref='chart'
                        data={this.data}
                        width={100}
                        height={100}
                        options={this.options}
                    />
                </div>
            </div>
        );
    }
}

export default ArticleSummary;