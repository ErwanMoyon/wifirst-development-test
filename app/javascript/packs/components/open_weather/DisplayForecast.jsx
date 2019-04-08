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
        <tr key={weather.dt}>
          <td>
            {weather.dt_txt}
          </td>
          <td>
            {weather.main.temp}°c - {weather.weather[0].description}
          </td>
        </tr>
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
        <tr key={weather.dt}>
          <td>
            {weather.dt_txt}
          </td>
          <td>
            {weather.main.temp}°c - {weather.weather[0].description}
          </td>
        </tr>
      )
    }
  }

  render() {
    var {forecast, isSearching} = this.props;

    if (forecast == null) return null;

    var averageTemperature = function(weathers) {
      var average = 0;

      for (var i = 0; i < weathers.length; i++) {
        average += weathers[i].main.temp;
      }

      return (Math.round(average / weathers.length));
    }

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
        <div className="display-forecast">
          <div className="title">
            La météo de <b>{forecast.city.name}</b> de demain :
          </div>
          <table className="table table-striped">
            <tbody>
              {forecast.list.map(this.forecastDisplayTomorrow)}
            </tbody>
          </table>

        </div>
      )
    else {
      // Get forecast weather for next working time days
      const result = forecast.list.filter(keepDailyTime);

      return (
        <div className="display-forecast">
          <div className="title">
            Sur les 5 prochains jours, il fera en moyenne <b>{ averageTemperature(result) }°c </b>
            à <b>{forecast.city.name}</b>
          </div>
          <table className="table table-striped">
            <tbody>
              {result.map(this.defaultDisplay)}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
