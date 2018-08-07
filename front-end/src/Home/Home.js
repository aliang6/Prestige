import React, {Component} from 'react';
import './Home.css';
import { CSSTransitionGroup } from 'react-transition-group';

class Home extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
      return (
        <CSSTransitionGroup
          transitionName="home"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1000}
        >
        <div className="home">
          <div className="home-text">
              <h1 id="logo-title">Prestige</h1>
              <h2 id="description">Reputability, Integrity, and Sentiment Analysis{/* Article legitimacy and analysis */}</h2>
          </div>
          <div className="search-form">
              {this.props.searchComponent}
          </div>
        </div>
        </CSSTransitionGroup>
      );
    }
  }

  export default Home
