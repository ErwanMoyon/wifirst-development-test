import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from "packs/components/open_weather/SearchBar";
import DisplayForecast from "packs/components/open_weather/DisplayForecast";
import Settings from "packs/components/settings/Settings";

export default class OpenWeatherIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null,
      isSearching: false,
      onSettings: false
    };

    this.searchWeather = this.searchWeather.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
    this.settingPage = this.settingPage.bind(this);
    this.backHome = this.backHome.bind(this);
  }

  componentWillMount() {
    const defaultSearch = JSON.parse(sessionStorage.getItem("setting")).city || "Paris";

    this.searchWeather(defaultSearch, false);
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

  settingPage() {
    this.setState({onSettings: true});
  }

  backHome() {
    this.setState({onSettings: false});
  }

  render() {
    var {forecast, onSettings, isSearching} = this.state;

    if (onSettings) {
      return (
        <div>
          <Settings
            backHome={this.backHome}
          />
        </div>
      )
    } else {
      return (
        <div>

          <SearchBar callback={this.searchWeather} />
          <button onClick={this.reloadPage}>Réinitialiser</button>
          <button onClick={this.settingPage}>Mes paramètres</button>
          <DisplayForecast
            forecast={forecast}
            isSearching={isSearching}
          />
        </div>
      )
    }
  }
}
