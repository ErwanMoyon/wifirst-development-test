import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from "packs/components/open_weather/SearchBar";
import DisplayForecast from "packs/components/open_weather/DisplayForecast";

export default class OpenWeatherIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      isSearching: false
    };

    this.searchWeather = this.searchWeather.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  componentWillMount() {
    this.searchWeather("Paris", false);
  }

  searchWeather(searchText, isSearching) {
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
          forecast: response,
          isSearching: isSearching
        });
      },
      error: function(error) {
        console.log(error);
      }
    })
  }

  reloadPage() {
    this.searchWeather("Paris", false);
  }

  render() {
    var {forecast, isSearching} = this.state;

    return (
      <div>
        <SearchBar callback={this.searchWeather} />
        <button onClick={this.reloadPage}>Réinitialiser</button>
        <DisplayForecast
          forecast={forecast}
          isSearching={isSearching}
        />
      </div>
    )
  }
}
