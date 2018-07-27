import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    var report;
    var article_title;
    fetch('/results').then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json);
      report = json;
      article_title = report.article.title;
    });
    console.log(article_title);
    console.log(report);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {article_title}
      </div>
    );
  }
}

class Results extends Component {
  render() {
    var report;
    fetch('/results').then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json);
      report = json;
    })

    const article_title = (<h1>{report.article.title}</h1>);

    return (
      <div>
        {article_title}
      </div>
    );
  }
}

export default App;
