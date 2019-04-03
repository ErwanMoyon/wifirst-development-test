import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from "packs/components/open_weather/SearchBar";
import DisplayForecast from "packs/components/open_weather/DisplayForecast";

export default class OpenWeatherIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null
    };

    this.callbackSearchBar = this.callbackSearchBar.bind(this);
  }

  callbackSearchBar(searchText) {
    var _this = this;

    // Call Open Weather API
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast",
      type: "GET",
      data: {
        q: searchText,
        APPID: "38d67f53da3f1ec05673deac7fb84e33",
        units: "metric",
        lang: "Fr"
      },
      success: function(response) {
        _this.setState({
          forecast: response
        });
      },
      error: function(error) {
        console.log(error);
      }
    })
  }

  render() {
    var {forecast} = this.state;

    return (
      <div>
        <SearchBar callback={this.callbackSearchBar} />
        <DisplayForecast forecast={forecast} />
      </div>
    )
  }
}
