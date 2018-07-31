import React, { Component } from 'react';
import Home from './Home/Home.js';
import SearchForm from './Home/SearchForm.js';
import Results from './Results/Results.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: true,
      url: '',
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleNewSearch = this.handleNewSearch.bind(this);
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value,
    });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
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
            url = {this.state.url}
          />
        }
      </div>
    )
  }
}

class Loading extends Component {
  constructor(props) {
    super(props);
  }
}

export default App;