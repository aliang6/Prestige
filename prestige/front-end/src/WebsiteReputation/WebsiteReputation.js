import React, {Component} from 'react';
import './WebsiteReputation.css';
import {Doughnut} from 'react-chartjs-2';

class WebsiteReputation extends Component {
    constructor(props) {
        super(props);
        this.data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };
        this.options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };

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
                    'rgba(30, 144, 255, 1)',
                    'rgba(30, 144, 255, 1)',
                ],
                borderWidth: 1,
            }],
        }
        this.conData = {
            labels: ['Confidence', ''],
            datasets: [{
                label: 'Confidence Interval',
                data: [this.props.confidence, (100 - this.props.confidence)],
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
        }
        this.repOptions = {
            maintainAspectRatio: false,
        }
    }

    render() {
        return (
            <div id="web-rep">
                <h1 id="rep-text">Website Reputation: <span id="rep">{this.props.reputation}</span></h1>
                <h3 id="url-text">Website Url: <span id="url">{this.props.url}</span></h3>
                <div id="graphs">
                    {/* <Bar
                        ref='chart'
                        data={this.data}
                        width={200}
                        height={200}
                        options={this.options}
                    /> */}
                    <Doughnut
                        ref='chart'
                        data={this.repData}
                        width={400}
                        height={400}
                        options={this.repOptions}
                    />
                    <Doughnut
                        ref='chat'
                        data={this.conData}
                        width={400}
                        height={400}
                        options={this.repOptions}
                    />
                </div>
            </div>
        );
    }
}

export default WebsiteReputation;