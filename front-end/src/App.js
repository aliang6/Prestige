import React, { Component } from 'react';
import Home from './Home/Home.js';
import SearchForm from './Home/SearchForm.js';
import Results from './Results/Results.js';
import './App.css';
import { CSSTransitionGroup } from 'react-transition-group';


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
    this.newSearch = this.newSearch.bind(this);
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
    const background = document.getElementById('background-image');
    background.style.filter = 'initial';
    const contentBack = document.getElementById('content');
    contentBack.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    this.newSearch();
  }

  newSearch(){
    this.setState({
      index: true,
      url: '',
    });
  }

  render() {
    return (
      <div>
        <CSSTransitionGroup
            transitionName="content"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1000}
        >
          <div id="background-image"></div>
        </CSSTransitionGroup>
        <div id="content">
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
              newSearch = {this.newSearch}
              url = {this.state.url}
            />
          }
        </div>
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
