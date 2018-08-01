import React, {Component} from 'react';
import './SentimentReport.css';
import {Pie} from 'react-chartjs-2';
import {Polar} from 'react-chartjs-2';

const backColor = 'rgba(0, 0, 0, 0.6)';
const hoverBackColor = 'rgba(0, 0, 0, 0.8)';
const borderColor = 'rgba(255, 215, 0, 1)';

class SentimentReport extends Component {
    constructor(props) {
        super(props);
        
        this.polData = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                label: 'Polarity',
                data: [
                    this.props.polarity_confidence * 100, 
                    100 - (this.props.polarity_confidence * 100)
                ],
                backgroundColor: [
                    backColor,
                    backColor,
                ],
                hoverBackgroundColor: [
                    hoverBackColor,
                    hoverBackColor
                ],
                borderColor: [
                    borderColor,
                    borderColor,
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
                    this.props.emotions.sadness * 100,
                    this.props.emotions.joy * 100,
                    this.props.emotions.fear * 100,
                    this.props.emotions.disgust * 100,
                    this.props.emotions.anger * 100,
                ],
                backgroundColor: [
                    backColor,
                    backColor,
                    backColor,
                    backColor,
                    backColor,
                ],
                hoverBackgroundColor: [
                    hoverBackColor,
                    hoverBackColor,
                    hoverBackColor,
                    hoverBackColor,
                    hoverBackColor,
                ],
                borderColor: [
                    borderColor,
                    borderColor,
                    borderColor,
                    borderColor,
                    borderColor,
                ],
            }],
        };

        this.polOptions = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        };

        this.emOptions ={
            maintainAspectRatio: false,
            scale: {
                ticks: {
                    backdropColor: 'rgba(0, 0, 0, 0)',
                }
            },
            legend: {
                position: 'top',
                fontColor: 'rgba(255, 255, 255, 1)',
                fontSize: 10,
            },
        };
    }

    render() {
        return (
            <div className="sent-rep">
                <h1 className="sent-text">Sentiment Report</h1>
                <div className="graphs">
                    <div className="sent-polarity">
                        <h3>Polarity</h3>
                        <div>
                            <Pie
                                ref='chart'
                                data={this.polData}
                                width={500}
                                height={400}
                                options={this.polOptions}
                            />
                        </div>
                    </div>
                    <div className="sent-emotions">
                        <h3>Emotions</h3>
                        <div>
                            <Polar
                                ref='chart'
                                data={this.emData}
                                width={500}
                                height={400}
                                options={this.emOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SentimentReport;