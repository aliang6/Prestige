import React, {Component} from 'react';
import './WebsiteReputation.css'; 
import Chart from 'chart.js';
import Bar from 'react-chartjs-2';

class WebsiteReputation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="web-rep">
                <h1 id="rep-text">Website Reputation: <span id="rep">{this.props.reputation}</span></h1>
                <h3 id="url-text">Website Url: <span id="url">{this.props.url}</span></h3>
                <div id="graphs">
                    
                    <DonutGraph 
                        width="400px"
                        height="400px"
                        data={[this.props.rating, 100-this.props.rating]}
                        labels={["pos", "neg"]}
                    />
                </div>
            </div>
        );
    }
}

class DonutGraph extends Component {
    constructor(props) {
        super(props);
        //var test;
        //this.graph = <canvas class="donut-graph" width={this.props.width} height={this.props.height}></canvas>;
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
        /* var newChart = new Chart(graph, {
            type: 'pie',
            data: {
                datasets: this.props.data,
                labels: this.props.label,
            }
        }); */

        /* var myChart = new Chart(graph, {
            type: 'bar',
            data: {
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
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });*/
    }

    render() {
        return (
            <div>
                <Bar
                    ref='chart'
                    data={this.data}
                    width={400}
                    height={400}
                    options={this.options}
                />
            </div>
            
        );
    }
}

export default WebsiteReputation;