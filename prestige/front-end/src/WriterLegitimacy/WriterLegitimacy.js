import React, {Component} from 'react';
import './WriterLegitimacy.css';
import {Pie} from 'react-chartjs-2';
import {HorizontalBar} from 'react-chartjs-2';

const backColor = 'rgba(0, 0, 0, 0.6)'
const hoverBackColor = 'rgba(0, 0, 0, 0.8)'
const borderColor = 'rgba(30, 144, 255, 1)';

function createTraitData(name, confidence) {
    return {
        labels: [name, ''],
        datasets: [{
            label: name,
            data: [confidence * 100, 100 - confidence * 100],
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
            ],
        }]
    };
}

function createFacetData(name, confidence) {
    const temp = confidence.map(((x) => {return x * 100}));
    return {
        labels: name,
        datasets: [{
            label: '',
            data: temp,
            backgroundColor: [
                backColor,
                backColor,
            ],
            hoverBackgroundColor: [
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
        }]
    };
}

class WriterLegitimacy extends Component {
    constructor(props) {
        super(props);
        const data = this.props.personality;
        this.openData = createTraitData('Openness', data.openness);
        this.consData = createTraitData('Conscientiousness', data.conscientiousness);
        this.extraData = createTraitData('Extraversion', data.extraversion);
        this.agreeData = createTraitData('Agreeableness', data.agreeableness);
        this.neuroData = createTraitData('Neuroticism', data.emotional_range);
        const facetOneNames = ['Morality', 'Dutifulness', 'Cautiousness', 'Intellect', 'Altruism'];
        const facetOneCon = [data.morality, data.dutifulness, data.cautiousness, data.intellect, data.altruism];
        this.facetOneData = createFacetData(facetOneNames, facetOneCon);
        const facetTwoNames = ['Anger', 'Immoderation', 'Imagination', 'Liberalism', 'Self-Efficacy'];
        const facetTwoCon = [data.anger, data.immoderation, data.imagination, data.liberalism, data.self_efficacy];
        this.facetTwoData = createFacetData(facetTwoNames, facetTwoCon);
    }

    render() {
        return (
            <div id="wri-leg">
                <h1 id="leg-text">Writer Legitimacy: <span id="leg">{this.props.author_legitimacy}</span></h1>
                <div id="big-five">
                    <h2 id="big-five-text">Big Five Personality Traits</h2>
                    <ul id="big-five-list">
                        <TraitGraph name='Openness' data={this.openData} />
                        <TraitGraph name='Conscientiousness' data={this.consData} />
                        <TraitGraph name='Extraversion' data={this.extraData} />
                        <TraitGraph name='Agreeableness' data={this.agreeData} />
                        <TraitGraph name='Neuoticism' data={this.neuroData} />
                    </ul>
                </div>
                <div id="facet">
                    <h2 id="facet-text">Significant Personality Facets</h2>
                    <ul id="facet-list">
                        <div id="list-one">
                            <FacetGraph data={this.facetOneData} />
                        </div>
                        <div id="list-two">
                            <FacetGraph data={this.facetTwoData} />
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}


class TraitGraph extends Component {
    constructor(props) {
        super(props);
        this.options = {
            //maintainAspectRatio: false,
            legend: {
                display: false,
            }
        };
    }

    render() {
        return (
            <div className='big-five-trait'>
                <li >{this.props.name}</li>
                <Pie
                    ref='chart'
                    data={this.props.data}
                    height={150}
                    width={150}
                    options={this.options}
                />
            </div>
        );
    }
}

class FacetGraph extends Component {
    constructor(props) {
        super(props);
        this.options = {
            legend: {
                display: false,
            },
            scales: {
                gridLines: {
                    display: false,
                    drawOnChartArea: false,
                },
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    }

    render() {
        return(
            <div className='sig-facet'>
                <HorizontalBar
                    ref='chart'
                    data={this.props.data}
                    options={this.options}
                />
            </div>
        );
    }
}

export default WriterLegitimacy;