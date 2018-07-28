import React, {Component} from 'react';

class SearchForm extends Component {
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.props.onUrlChange(event);
    }
  
    handleSubmit(event) {
      this.props.onButtonClick(event);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label> Article Url: </label>
          <input type="text" name="url_input" value={this.props.url} onChange={this.handleChange} placeholder="Input the url to an article..." />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default SearchForm;