import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.backToHome = this.backToHome.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  backToHome() {
    this.props.backHome();
  }

  updateSettings(event) {
    event.preventDefault();

    const jwt = sessionStorage.getItem("jwt");

    $.ajax({
      url: "/api/v1/settings",
      type: "POST",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", "Bearer " + jwt);
      },
      data: {
        setting: {
          city: this.city.value
        }
      },
      success: function(response) {
        sessionStorage.setItem("setting", JSON.stringify(response));
      }
    })
  }

  render() {
    const setting = JSON.parse(sessionStorage.getItem("setting")) || {};

    return (
      <div className="default-top">
        <h1>Mes paramètres</h1>
        <button
          className="btn-secondary"
          onClick={this.backToHome}>
          Retour
        </button>
        <div className="row justify-content-center" >
          <div className="col-6">
            <form onSubmit={this.updateSettings}>
              <div className="form-group">
                <label>
                  Ville :
                </label>
                <input
                  className="form-control"
                  ref={el => this.city = el}
                  type="text"
                  defaultValue={setting.city}
                />
              </div>
              <input
                className="btn-primary"
                type="submit"
                value="Sauvegarder"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
