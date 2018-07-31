import React, {Component} from 'react';
import './SearchForm.css';

class SearchForm extends Component {
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSearchInput = this.handleSearchInput.bind(this);
    }
  
    handleChange(event) {
      this.props.onUrlChange(event);
    }
  
    handleSubmit(event) {
      this.props.onButtonClick(event);
    }

    handleSearchInput(event) {
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="search-container">
            <button className="search-underline" onClick={this.handleSearchInput}>
              <input type="text" className="search-input" name="url_input" value={this.props.url} onChange={this.handleChange} placeholder="Input the url to an article..." />
              <span class="underline"></span>
            </button>
            <button type="submit" class="submit-btn" value="Submit">Analyze</button>
          </div>
        </form>
      );
    }
  }

  export default SearchForm;