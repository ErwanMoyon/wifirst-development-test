import React from 'react';
import ReactDOM from 'react-dom';

export default class DisplayForecast extends React.Component {
  constructor(props) {
    super(props);

    this.defaultDisplay = this.defaultDisplay.bind(this);
  }
  /**
   * Display the next days weather depending on:
   * If user preferences and is searching for a city weather
   */
  forecastDisplayTomorrow(weather) {
    var currentDate = new Date();
    var tomorrowDay = currentDate.getDate() + 1;

    var weatherDate = new Date(weather.dt * 1000);

    // Display only tomorrow weather
    if (weatherDate.getDate() == tomorrowDay) {
      return (
        <li key={weather.dt}>
          {weather.dt_txt} :
          <ul>
            <li>
              Température : {weather.main.temp}°c
            </li>
            <li>
              Condition météorologique : {weather.weather[0].description}
            </li>
          </ul>
        </li>
      )
    }
  }

  defaultDisplay(weather) {
    var currentDate = new Date();
    var fifthDay = currentDate.getDate() + 4;

    var weatherDate = new Date(weather.dt * 1000);

    // Display only weather during the work hours
    if (weatherDate.getDate() <= fifthDay) {
      return (
        <li key={weather.dt}>
          {weather.dt_txt} :
          <ul>
            <li>
              Température : {weather.main.temp}°c
            </li>
            <li>
              Condition météorologique : {weather.weather[0].description}
            </li>
          </ul>
        </li>
      )
    }
  }

  render() {
    var {forecast, isSearching} = this.props;

    if (forecast == null) return null;

    /**
     * Only show weather on daily work time
     */
    var keepDailyTime = function(weather) {
      let weatherDate = new Date(weather.dt * 1000);
      let weatherHour = weatherDate.getHours();
      return (9 <= weatherHour && weatherHour <= 20)
    };

    if (isSearching)
      return (
        <div>
          La météo de {forecast.city.name} de demain :
          <ul>
            {forecast.list.map(this.forecastDisplayTomorrow)}
          </ul>

        </div>
      )
    else {
      // Get forecast weather for next working time days
      const result = forecast.list.filter(keepDailyTime);

      return (
        <div>
          La météo de {forecast.city.name} sur les 5 prochains jours sera :
          {result.map(this.defaultDisplay)}
        </div>
      );
    }
  }
}
