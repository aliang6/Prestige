import React, {Component} from 'react';

class WriterLegitimacy extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="wri-leg">
                <h1 id="leg-text">Writer Legitimacy: <span id="leg">{this.props.legitimacy}</span></h1>
                <h2 id="big-five-text">Big Five Personality Traits</h2>
                <ul id="big-five-list">
                    <li className="big-five-trait">Openness</li>
                    <li className="big-five-trait">Conscientiousness</li>
                    <li className="big-five-trait">Extraversion</li>
                    <li className="big-five-trait">Agreeableness</li>
                    <li className="big-five-trait">Neuroticism</li>
                </ul>
                <h2 id="facet-text">Significant Personality Facets</h2>
                <ul id="facet-list">
                    <li className="sig-facet">Morality</li>
                    <li className="sig-facet">Dutifulness</li>
                    <li className="sig-facet">Cautiousness</li>
                    <li className="sig-facet">Intellect</li>
                    <li className="sig-facet">Altruism</li>
                    <li className="sig-facet">Anger</li>
                    <li className="sig-facet">Immoderation</li>
                    <li className="sig-facet">Imagination</li>
                    <li className="sig-facet">Liberalism</li>
                    <li className="sig-facet">Self-Efficacy</li>
                </ul>
            </div>
        );
    }
}

export default WriterLegitimacy;