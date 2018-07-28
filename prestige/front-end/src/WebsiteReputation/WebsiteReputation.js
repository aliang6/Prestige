import React, {Component} from 'react';

class WebsiteReputation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="web-rep">
                <h1 id="rep-text">Website Reputation: <span id="rep">{this.props.reputation}</span></h1>
                <h3 id="url-text">Website Url: <span id="url">{this.props.url}</span></h3>
            </div>
        );
    }
}

export default WebsiteReputation;