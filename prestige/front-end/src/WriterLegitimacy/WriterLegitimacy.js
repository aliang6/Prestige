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
                    <li class="big-five-trait">Openness</li>
                    <li class="big-five-trait">Conscientiousness</li>
                    <li class="big-five-trait">Extraversion</li>
                    <li class="big-five-trait">Agreeableness</li>
                    <li class="big-five-trait">Neuroticism</li>
                </ul>
                <h2 id="facet-text">Significant Personality Facets</h2>
                <ul id="facet-list">
                    <li class="sig-facet">Morality</li>
                    <li class="sig-facet">Dutifulness</li>
                    <li class="sig-facet">Cautiousness</li>
                    <li class="sig-facet">Intellect</li>
                    <li class="sig-facet">Altruism</li>
                    <li class="sig-facet">Anger</li>
                    <li class="sig-facet">Immoderation</li>
                    <li class="sig-facet">Imagination</li>
                    <li class="sig-facet">Liberalism</li>
                    <li class="sig-facet">Self-Efficacy</li>
                </ul>
                <h4>Chart</h4>
            </div>
        );
    }
}

export default WebsiteReputation;