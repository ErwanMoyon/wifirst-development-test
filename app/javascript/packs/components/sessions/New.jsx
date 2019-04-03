import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class SessionNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };

    this.handLogin = this.handLogin.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleLoginChange(event) {
    this.setState({login: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handLogin(event) {
    var {login, password} = this.state;
    var {callbackLogin} = this.props;

    event.preventDefault();

    $.ajax({
      url: "/api/v1/user_token",
      type: "POST",
      data: {
        auth: {
          email: login,
          password: password
        }
      },
      success: function(response) {
        callbackLogin(response.jwt);
      },
      error: function(error) {
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.handLogin}>
        <label>
          Login:
          <input type="text" value={this.state.login} onChange={this.handleLoginChange} />
        </label>
        <label>
          Mot de passe:
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Se connecter" />
      </form>    )
  }
}
