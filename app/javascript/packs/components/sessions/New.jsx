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
      <div className="row justify-content-center default-top">
        <h1>Connexion</h1>
        <div className="col-6">
          <form>
            <div className="form-group">
              <label>Email :</label>
              <input
                className="form-control"
                type="text"
                value={this.state.login}
                onChange={this.handleLoginChange}
              />
            </div>
            <div className="form-group">
              <label> Mot de passe : </label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                className="form-control"
              />
            </div>
            <button
              className="btn-primary"
              type="submit"
              onClick={this.handLogin}>
              Se connecter
            </button>
          </form>
        </div>
      </div>
    )
  }
}
