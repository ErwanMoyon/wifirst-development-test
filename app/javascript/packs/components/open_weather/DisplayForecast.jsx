import React from 'react';
import ReactDOM from 'react-dom';

export default class DisplayForecast extends React.Component {
  render() {
    var {forecast} = this.props;

    var forecastDisplay = function(weather) {
      var currentDate = new Date();
      var tomorrowDay = currentDate.getDate() + 1;

      var weatherDate = new Date(weather.dt * 1000);
      console.log(weather);
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

    if (forecast)
      return (
        <div>
          Demain à {forecast.city.name}, la météo sera la suivante :
          <ul>
            {forecast.list.map(forecastDisplay)}
          </ul>

        </div>
      )
    else
      return null;
  }
}
