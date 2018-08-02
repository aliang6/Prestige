import React, {Component} from 'react';
import './SentimentReport.css';
import {Pie} from 'react-chartjs-2';
import {Polar} from 'react-chartjs-2';
import { CSSTransitionGroup } from 'react-transition-group';

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
                    'rgba(25, 118, 31, 0.65)',
                    'rgba(110, 20, 6, 0.65)',
                ],
                hoverBackgroundColor: [
                    'rgba(25, 118, 31, 0.85)',
                    'rgba(110, 20, 6, 0.85)',
                ],
                borderColor: [
                    'rgba(25, 118, 31, 1)',
                    'rgba(110, 20, 6, 1)',
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
                    'rgba(2, 31, 77, 0.65)',
                    'rgba(255, 248, 0, 0.65)',
                    'rgba(57, 1, 77, 0.65)',
                    'rgba(0, 130, 34, 0.65)',
                    'rgba(189, 9, 0, 0.65)',
                ],
                hoverBackgroundColor: [
                    'rgba(2, 31, 77, 0.85)',
                    'rgba(255, 248, 0, 0.85)',
                    'rgba(57, 1, 77, 0.85)',
                    'rgba(0, 130, 34, 0.85)',
                    'rgba(189, 9, 0, 0.85)',
                ],
                borderColor: [
                    'rgba(2, 31, 77, 1)',
                    'rgba(255, 248, 0, 1)',
                    'rgba(57, 1, 77, 1)',
                    'rgba(0, 130, 34, 1)',
                    'rgba(189, 9, 0, 1)',
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
                    fontColor: 'rgba(255, 255, 255, 0.85)',
                }
            },
            legend: {
                position: 'top',
                labels: {
                    fontColor: 'rgba(255, 255, 255, 0.85)',
                },
                ticks: {
                }
            },
        };
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
            </CSSTransitionGroup>
        );
    }
}

export default SentimentReport;