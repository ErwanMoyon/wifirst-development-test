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
  }

  componentWillMount() {
    var jwt = sessionStorage.getItem("jwt");

    if (jwt)
      this.setState({jwt: jwt});
  }

  callbackLogin(jwt) {
    // Store locally the jwt token to keep the session active
    sessionStorage.setItem("jwt", jwt);

    this.setState({jwt: jwt});
  }

  render() {
    var {jwt} = this.state;

    if (jwt)
      return <OpenWeatherIndex />;
    else
      return <SessionNew callbackLogin={this.callbackLogin} />;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HomeIndex />,
    document.body.appendChild(document.createElement('div')),
  )
})
