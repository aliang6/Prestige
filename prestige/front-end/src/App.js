import React, { Component } from 'react';
import logo from './logo.svg';
import Results from './Results';
import './App.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIndex: true,
    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <h1 id="logo-title">Prestige</h1>
        <SearchForm />
      </div>
    );
  }
}

class SearchForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      url: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('/results', { 
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({ inputUrl: this.state.url }),
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label> Article Url:</label>
        <input type="text" name="url_input" value={this.state.url} onChange={this.handleChange} placeholder="Input the url to an article..." />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Index;