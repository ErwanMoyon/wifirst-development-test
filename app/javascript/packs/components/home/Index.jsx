import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import OpenWeatherIndex from "packs/components/open_weather/Index";
import SessionNew from "packs/components/sessions/New";

export default class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: null
    }

    this.callbackLogin = this.callbackLogin.bind(this);
    this.getSettings = this.getSettings.bind(this);
  }

  componentWillMount() {
    var jwt = sessionStorage.getItem("jwt");

    if (jwt) {
      this.getSettings();
      this.setState({jwt: jwt});
    }
  }

  getSettings() {
    const jwt = sessionStorage.getItem("jwt");

    $.ajax({
      url: "api/v1/settings/",
      type: "GET",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", "Bearer " + jwt);
      },
      success: function(response) {
        sessionStorage.setItem("setting", JSON.stringify(response));
      }
    })
  }

  callbackLogin(jwt) {
    // Store locally the jwt token to keep the session active
    sessionStorage.setItem("jwt", jwt);

    this.getSettings();
    this.setState({jwt: jwt});
  }

  render() {
    var {jwt} = this.state;

    if (jwt)
      return (
        <div className="container">
          <OpenWeatherIndex />
        </div>
      );
    else
      return (
        <div className="container">
          <SessionNew callbackLogin={this.callbackLogin} />
        </div>
      );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HomeIndex />,
    document.getElementById("root"),
  )
})
