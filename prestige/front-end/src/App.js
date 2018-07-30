import React, { Component } from 'react';
import Home from './Home/Home.js';
import SearchForm from './Home/SearchForm.js';
import Results from './Results/Results.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: true,
      url: '',
    };
    var report;
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value,
    });
  }

  async handleSearchSubmit(event) {
    event.preventDefault();
    await fetch('/results', { 
      method: 'POST',
      headers: {'Content-Type':'application/json'}, 
      body: JSON.stringify({ inputUrl: this.state.url }),
    }).then((res) => {
      return res.json();
    }).then((json) => {
      this.report = JSON.parse(JSON.stringify(json));
    });
    console.log(this.report);
    this.setState({
      index: false,
    });
  }

  handleNewSearch(event) {
    event.preventDefault();
    this.setState({
      index: true,
    });
  }

  render() {
    return (
      <div>
        {this.state.index && 
          <Home searchComponent = {
            <SearchForm
              url = {this.state.url}
              onUrlChange = {this.handleUrlChange}
              onButtonClick = {this.handleSearchSubmit} 
            />
          }/>
        }
        {!this.state.index &&  
          <Results 
            report = {this.report}
            newSearchClick = {this.handleNewSearch}
          />
        }
      </div>
    )
  }
}

export default App;