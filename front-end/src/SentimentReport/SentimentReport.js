import React, {Component} from 'react';
import './SentimentReport.css';
import {Pie} from 'react-chartjs-2';
import {Polar} from 'react-chartjs-2';
import { CSSTransitionGroup } from 'react-transition-group';
import ReactTooltip from 'react-tooltip';

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
                    'rgba(0, 67, 12, 0.80)',
                    'rgba(110, 20, 6, 0.80)',
                ],
                hoverBackgroundColor: [
                    'rgba(0, 67, 12, 0.90)',
                    'rgba(110, 20, 6, 0.90)',
                ],
                borderColor: [
                    'rgba(88, 73, 0, .85)',
                    'rgba(88, 73, 0, .85)',
                ],
                borderWidth: 2,
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
                    'rgba(14, 47, 155, 0.65)',
                    'rgba(255, 248, 0, 0.65)',
                    'rgba(57, 1, 77, 0.65)',
                    'rgba(0, 130, 34, 0.65)',
                    'rgba(189, 9, 0, 0.65)',
                ],
                hoverBackgroundColor: [
                    'rgba(14, 47, 155, 0.85)',
                    'rgba(255, 248, 0, 0.85)',
                    'rgba(57, 1, 77, 0.85)',
                    'rgba(0, 130, 34, 0.85)',
                    'rgba(189, 9, 0, 0.85)',
                ],
                borderColor: [
                    'rgba(14, 47, 155, 1)',
                    'rgba(255, 248, 0, 1)',
                    'rgba(57, 1, 77, 1)',
                    'rgba(0, 130, 34, 1)',
                    'rgba(189, 9, 0, 1)',
                ],
                borderWidth: 2,
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
                        <div className='text-and-help'>
                            <h3>Polarity</h3>
                            <a data-tip data-for='pol-help' className="help-logo"><ion-icon name="help-circle-outline" size="small"></ion-icon></a>
                            <ReactTooltip id='pol-help' place="top" type="dark" effect="solid">
                                <p className='help-text'>The writer's general sentiment throughout the article. 
                                <br/> Higher polarity represents higher favorability towards the main concepts in the article.</p>
                            </ReactTooltip>
                        </div>
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
                        <div className='text-and-help'>
                            <h3>Emotions</h3>
                            <a data-tip data-for='em-help' className="help-logo"><ion-icon name="help-circle-outline" size="small"></ion-icon></a>
                            <ReactTooltip id='em-help' place="top" type="dark" effect="solid">
                                <p className='help-text'>The writer's display of emotion throughout the article.
                                <br/> Higher percentages mean a higher likelihood of the author displaying that emotion.</p>
                            </ReactTooltip>
                        </div>
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