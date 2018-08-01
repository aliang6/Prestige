import React, {Component} from 'react';
import './ArticleSummary.css';
import {Doughnut} from 'react-chartjs-2';

const backColor = 'rgba(0, 0, 0, 0.6)'
const hoverBackColor = 'rgba(0, 0, 0, 0.8)'
const borderColor = 'rgba(255, 215, 0, 1)';

class ArticleSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.displayFullArticle = this.displayFullArticle.bind(this);
    }

    displayFullArticle(event) {
        event.preventDefault();
    }

    closeFullArticle(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="art-sum">
                <h1 className="art-sum-text">Article Summary</h1>
                <h3 className="art-title-text">Article Title: {this.props.article.title}</h3>
                <div className="main-section">
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
        );
    }
}

class FullArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleEvent(event){
        this.props.closeFullArticle(event);
    }

    render() {
        return (
            <div className="full-article-comp">
                <h1>{this.props.title}</h1>
                <h3>{this.props.writer}</h3>
                <img src={this.props.image} alt={this.props.image} />
                <p>{this.props.fullArticle}</p>
                <button onClick={this.handleEvent}>Close Full Article</button> 
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
            <div className="summary-text">
                <h3 className="summary-text">Summary</h3>
                <ul className="summary-list">
                    {this.listSentences}
                </ul>
                <button onClick={this.props.displayFullArticle}>Display Full Article</button>
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
                <div className="con-rel-text">
                    <h3 className="concept-text">Main Concepts and Relevance</h3>
                </div>
                <ul className="concept-list">
                    <ConceptTopic concept={this.props.concepts[0]} />
                    <ConceptTopic concept={this.props.concepts[1]} />
                    <ConceptTopic concept={this.props.concepts[2]} />
                </ul>
            </div>
        );
    }
}

class ConceptTopic extends Component {
    constructor(props){
        super(props);
        this.data = {
            labels: '',
            datasets: [{
                label: '',
                data: [this.props.concept.relevance * 100, 100 - this.props.concept.relevance * 100],
                backgroundColor: [
                    backColor,
                    backColor,
                ],
                hoverBackgroundColor: [
                    hoverBackColor,
                    hoverBackColor,
                ],
                borderColor: [
                    borderColor,
                    borderColor,
                ],
            }],
        };
        this.options = {
            maintainAspectRatio: false,
        }
    }

    render() {
        return (
            <div className='concept-name'>
                <div className="concept-topic">
                    <li><a href={this.props.concept.dbpedia_resource}>{this.props.concept.text}</a></li>
                </div>
                <div className="donut-graph">
                    <Doughnut 
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