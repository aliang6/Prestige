import React, {Component} from 'react';
import logo from './logo.svg';
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
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p> */}
  
          <h1 id="logo-title">Prestige</h1>
          {this.props.searchComponent}
        </div>
      );
    }
  }

  export default Home