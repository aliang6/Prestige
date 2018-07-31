import React, {Component} from 'react';
import './Home.css';

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
        <div className="home">
          <div className="home-text">
              <h1 id="logo-title">Prestige</h1>
              <h2 id="description">I like cows{/* Article legitimacy and analysis */}</h2>
          </div>
          <div className="search-form">
              {this.props.searchComponent}
          </div>
        </div>
      );
    }
  }

  export default Home