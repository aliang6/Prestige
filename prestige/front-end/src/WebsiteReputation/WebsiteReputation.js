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
                    //'rgba(30, 144, 255, 0.5)',
                    'rgba(0, 0, 0, 0.6)',
                    'rgba(0, 0, 0, 0.6)',
                ],
                hoverBackgroundColor: [
                    //'rgba(30, 144, 255, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                    'rgba(0, 0, 0, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 215, 0, 0.85)',
                    'rgba(213, 0, 0, 0.85)',
                ],
                borderWidth: 3,
            }],
        }
        this.conData = {
            labels: ['Confidence', ''],
            datasets: [{
                label: 'Confidence Interval',
                data: [this.props.confidence, (100 - this.props.confidence)],
                backgroundColor: [
                    'rgba(255, 215, 0, 0.5)',
                    'rgba(213, 0, 0, 0.5)',
                ],
                hoverBackgroundColor: [
                    'rgba(255, 215, 0, 0.75)',
                    'rgba(213, 0, 0, 0.75)',
                ],
                borderColor: [
                    'rgba(255, 215, 0, 0.85)',
                    'rgba(213, 0, 0, 0.85)',
                ],
                borderWidth: 3,
            }],
        }
        this.repOptions = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Reputation',
                fontSize: 24,
                fontFamily: "Trebuchet"
            }
        }
        this.conOptions = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Confidence',
                fontSize: 24,
                fontFamily: "'Helvetica', sans-serif",
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
                            width={400}
                            height={400}
                            options={this.repOptions}
                        />
                    </div>
                    <div class="donut-graph">
                        <Doughnut
                            ref='chat'
                            data={this.conData}
                            width={400}
                            height={400}
                            options={this.conOptions}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default WebsiteReputation;