import React, {Component} from 'react';
import './SentimentReport.css';
import {Doughnut} from 'react-chartjs-2';
import {Polar} from 'react-chartjs-2';

class SentimentReport extends Component {
    constructor(props) {
        super(props);
        
        this.polData = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                label: 'Polarity',
                data: [
                    this.props.polarity_confidence, 
                    (100 - this.props.polarity_confidence)
                ],
                backgroundColor: [
                    'rgba(30, 144, 255, 0.5)',
                    'rgba(0, 0, 0, 0.6)',
                ],
                hoverBackgroundColor: [
                    'rgba(30, 144, 255, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                ],
                borderColor: [
                    'rgba(30, 144, 255, 1)',
                    'rgba(30, 144, 255, 1)',
                ],
                borderWidth: 1,
            }],
        };

        this.emData = {
            labels: [
                'Sadness',
                'Joy',
                'Fear',
                'Disgust',
                'Anger'
            ],
            datasets: [{
                label: 'Emotions',
                data: [
                    this.props.emotions.sadness,
                    this.props.emotions.joy,
                    this.props.emotions.fear,
                    this.props.emotions.disgust,
                    this.props.emotions.anger,
                ],
                backgroundColor: [
                    'rgba(0, 0, 0, 0.6)',
                    'rgba(0, 0, 0, 0.6)',
                    'rgba(0, 0, 0, 0.6)',
                    'rgba(0, 0, 0, 0.6)',
                    'rgba(0, 0, 0, 0.6)',
                ],
                hoverBackgroundColor: [
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                ],
                borderColor: [
                    'rgba(30, 144, 255, 1)',
                    'rgba(30, 144, 255, 1)',
                    'rgba(30, 144, 255, 1)',
                    'rgba(30, 144, 255, 1)',
                    'rgba(30, 144, 255, 1)',
                ],
            }],
        };

        this.options = {
            maintainAspectRatio: false,
        };
    }

    render() {
        return (
            <div id="sent-rep">
                <h1 id="sent-text">Sentiment Report</h1>
                <div id="graphs">
                    <div id="sent-polarity">
                        <h3>Polarity: {this.props.polarity}</h3>
                        <Doughnut
                            ref='chart'
                            data={this.polData}
                            width={400}
                            height={400}
                            options={this.options}
                        />
                    </div>
                    <div id="sent-emotions">
                        <h3>Emotions: </h3>
                        <Polar
                            ref='chart'
                            data={this.emData}
                            width={400}
                            height={400}
                            options={this.options}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SentimentReport;