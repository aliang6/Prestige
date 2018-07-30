import React, {Component} from 'react';
import './WriterLegitimacy.css';

class WriterLegitimacy extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wri-leg">
                <h1 id="leg-text">Writer Legitimacy: <span id="leg">{this.props.author_legitimacy}</span></h1>
                <div id="big-five">
                    <h2 id="big-five-text">Big Five Personality Traits</h2>
                    <ul id="big-five-list">
                        <li className="big-five-trait">Openness</li>
                        <li className="big-five-trait">Conscientiousness</li>
                        <li className="big-five-trait">Extraversion</li>
                        <li className="big-five-trait">Agreeableness</li>
                        <li className="big-five-trait">Neuroticism</li>
                    </ul>
                </div>
                <div id="facet">
                    <h2 id="facet-text">Significant Personality Facets</h2>
                    <ul id="facet-list">
                        <div id="list-one">
                            <li className="sig-facet">Morality</li>
                            <li className="sig-facet">Dutifulness</li>
                            <li className="sig-facet">Cautiousness</li>
                            <li className="sig-facet">Intellect</li>
                            <li className="sig-facet">Altruism</li>
                        </div>
                        <div id="list-two">
                            <li className="sig-facet">Anger</li>
                            <li className="sig-facet">Immoderation</li>
                            <li className="sig-facet">Imagination</li>
                            <li className="sig-facet">Liberalism</li>
                            <li className="sig-facet">Self-Efficacy</li>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}

export default WriterLegitimacy;