import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(event) {
    event.preventDefault();

    // Look For new weather
    this.props.callback(this.state.searchText, true);
  }

  handleChange(event) {
    this.setState({searchText: event.target.value});
  }

  render() {
    return(
      <div id="search-bar" className="form-group row justify-content-center">
        <div className="col-6">
          <input
            type="text"
            onChange={this.handleChange}
          />
          <button
            className="btn-primary"
            onClick={this.submitSearch}>
            Lancer la recherche
          </button>
        </div>
      </div>
    )
  }
}
