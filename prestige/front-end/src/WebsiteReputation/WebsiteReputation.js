import React, {Component} from 'react';
import './WebsiteReputation.css';
import {Doughnut} from 'react-chartjs-2';

class WebsiteReputation extends Component {
    constructor(props) {
        super(props);

        this.repData = {
            labels: ['Positive', 'Negative'],
            datasets: [{
                label: 'Website Reputation',
                data: [this.props.rating, (100 - this.props.rating)],
                backgroundColor: [
                    //'rgba(255, 215, 0, 0.65)',
                    'rgba(0, 0, 0, 0.65)',
                    'rgba(0, 0, 0, 0.65)',
                ],
                hoverBackgroundColor: [
                    'rgba(255, 215, 0, 0.85)',
                    'rgba(0, 0, 0, 0.85)',
                ],
                borderColor: [
                    'rgba(255, 215, 0, 1)',
                    'rgba(255, 215, 0, 1)',
                ],
                borderWidth: 2,
            }],
        }
        this.conData = {
            labels: ['Confidence', ''],
            datasets: [{
                label: 'Confidence Interval',
                data: [this.props.confidence, (100 - this.props.confidence)],
                backgroundColor: [
                    //'rgba(255, 215, 0, 0.65)',
                    'rgba(0, 0, 0, 0.65)',
                    'rgba(0, 0, 0, 0.65)',
                ],
                hoverBackgroundColor: [
                    'rgba(255, 215, 0, 0.85)',
                    'rgba(0, 0, 0, 0.85)',
                ],
                borderColor: [
                    'rgba(255, 215, 0, 1)',
                    'rgba(255, 215, 0, 1)',
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
                display: true,
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
                display: true,
                text: 'Confidence: ' + this.props.confidence + '%',
                fontSize: 24,
                fontFamily: "'Roboto', sans-serif",
                fontStyle: 'normal',
                fontColor: 'rgba(255, 255, 255, 0.9)',
            }
        }
    }

    render() {
        return (
            <div id="web-rep">
                <h1 id="rep-text">Website Reputation: <span id="rep">{this.props.reputation}</span></h1>
                <h3 id="url-text">Website Url: <span id="url">{this.props.url}</span></h3>
                <div id="graphs">
                    <div class="donut-graph">
                        <Doughnut
                            ref='chart'
                            data={this.repData}
                            width={350}
                            height={350}
                            options={this.repOptions}
                        />
                    </div>
                    <div class="donut-graph">
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
        );
    }
}

export default WebsiteReputation;