import React, {Component} from 'react';
import './WebsiteReputation.css';
import {Doughnut} from 'react-chartjs-2';

const backColorPos = 'rgba(0, 0, 0, 0.65)';
const backColorNeg = 'rgba(0, 0, 0, 0.65)';
const hoverBackColorPos = 'rgba(44, 123, 182, 0.85)';
const hoverBackColorNeg = 'rgba(0, 0, 0, 0.65)';
const borderColor = 'rgba(255, 215, 0, 1)';

class WebsiteReputation extends Component {
    constructor(props) {
        super(props);

        this.repData = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                label: 'Website Reputation',
                data: [this.props.rating, (100 - this.props.rating)],
                backgroundColor: [
                    backColorPos,
                    backColorNeg
                ],
                hoverBackgroundColor: [
                    hoverBackColorPos,
                    hoverBackColorNeg,
                ],
                borderColor: [
                    borderColor,
                    borderColor,
                ],
                borderWidth: 2,
            }],
        }
        this.conData = {
            labels: ['Confidence Probability', 'Confidence Probability'],
            datasets: [{
                label: 'Confidence Interval',
                data: [this.props.confidence, (100 - this.props.confidence)],
                backgroundColor: [
                    backColorPos,
                    backColorNeg
                ],
                hoverBackgroundColor: [
                    hoverBackColorPos,
                    hoverBackColorNeg,
                ],
                borderColor: [
                    borderColor,
                    borderColor,
                ],
                borderWidth: 2,
            }],
        }
        this.repOptions = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Reputation: ' + this.props.rating + '%',
                fontSize: 24,
                fontFamily: "'Roboto', sans-serif",
                fontStyle: 'normal',
                fontColor: 'rgba(255, 255, 255, 0.9)',
            }
        }
        this.conOptions = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: 'Confidence: ' + this.props.confidence + '%',
                fontSize: 24,
                fontFamily: "'Roboto', sans-serif",
                fontStyle: 'normal',
                fontColor: 'rgba(255, 255, 255, 0.9)',
            },
            /* tooltips: {
                callbacks: {
                   title: (t, d) => {
                      return d.labels[t[0].index];
                   },
                   label: (t, d) => {
                        var label = d.datasets[t.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }

                        label += Math.round(t.yLabel * 100) / 100;
                        return label;
                   }
                }
             } */
        }
    }

    render() {
        return (
            <div className="web-rep">
                <h1 className="rep-text">Website Reputation: <span className="rep">{this.props.reputation}</span></h1>
                <h3 className="url-text">Website Url: <span className="url">{this.props.url}</span></h3>
                <div className="graphs">
                    <div className="donut-graph">
                        <h3>Reputation Rating: {this.props.rating}%</h3>
                        <div>
                            <Doughnut
                                ref='chart'
                                data={this.repData}
                                width={350}
                                height={350}
                                options={this.repOptions}
                            />
                        </div>
                    </div>
                    <div className="donut-graph">
                        <h3>Reputation Confidence: {this.props.confidence}%</h3>
                        <div>
                            <Doughnut
                                ref='chat'
                                data={this.conData}
                                width={350}
                                height={350}
                                options={this.conOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WebsiteReputation;