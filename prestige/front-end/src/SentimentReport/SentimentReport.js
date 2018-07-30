import React, {Component} from 'react';
import './SentimentReport.css';

class SentimentReport extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="sent-rep">
                <h1 id="sent-text">Sentiment Report</h1>
                <div id="graphs">
                    <div id="sent-polarity">
                        <h3>Polarity: {this.props.polarity}</h3>
                    </div>
                    <div id="sent-emotions">
                        <h3>Emotions: </h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default SentimentReport;