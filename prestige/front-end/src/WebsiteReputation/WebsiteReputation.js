import React, {Component} from 'react';
import './WebsiteReputation.css';

class WebsiteReputation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="web-rep">
                <div id="text">
                    <h1 id="rep-text">Website Reputation: <span id="rep">{this.props.reputation}</span></h1>
                    <h3 id="url-text">Website Url: <span id="url">{this.props.url}</span></h3>
                </div>
                <div id="rep-graph"></div>
                <div id="con-graph"></div>
            </div>
        );
    }
}

export default WebsiteReputation;