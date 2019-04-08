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
    var storage = sessionStorage.getItem("setting");
    const defaultSearch = (storage != "null") ? JSON.parse(storage).city : "Paris";

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
    var storage = sessionStorage.getItem("setting");
    const defaultSearch = (storage != "null") ? JSON.parse(storage).city : "Paris";

    this.searchWeather(defaultSearch, false);
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
        <div className="default-top">
          <h1>La météo</h1>
          <SearchBar callback={this.searchWeather} />
          <div id="secondary-buttons">
            <button
              className="btn-secondary"
              onClick={this.reloadPage}>
              Réinitialiser
            </button>
            <button
              className="btn-secondary"
              onClick={this.settingPage}>
              Mes paramètres
            </button>
          </div>

          <DisplayForecast
            forecast={forecast}
            isSearching={isSearching}
          />
        </div>
      )
    }
  }
}
