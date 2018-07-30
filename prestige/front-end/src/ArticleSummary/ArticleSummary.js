import React, {Component} from 'react';
import './ArticleSummary.css';

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
            <div id="art-sum">
                <h1 id="art-sum-text">Article Summary</h1>
                <h3 id="art-title-text">Article Title: {this.props.article.title}</h3>
                <div id="summary">
                    <div id="con-rel-section">
                        <div id="concept-section">
                            <h3 id="concept-text">Main Concepts</h3>
                        </div>
                        <div id="relevance-section">
                            <h3 id="relevance-text">Relevance</h3>
                        </div>
                    </div>
                    <div id="summary-text">
                        <h3 id="summary-text">Summary</h3>
                        <ul id="summary-list">
                            <li id="summary-sentence"></li>
                            <li id="summary-sentence"></li>
                            <li id="summary-sentence"></li>
                            <li id="summary-sentence"></li>
                            <li id="summary-sentence"></li>
                        </ul>
                        <button onClick={this.displayFullArticle}>Display Full Article</button>
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
            <div id="full-article-comp">
                <h1>{this.props.title}</h1>
                <h3>{this.props.writer}</h3>
                <img src={this.props.image} alt={this.props.image} />
                <p>{this.props.fullArticle}</p>
                <button onClick={this.handleEvent}>Close Full Article</button> 
            </div>
        );
    }
}

export default ArticleSummary;