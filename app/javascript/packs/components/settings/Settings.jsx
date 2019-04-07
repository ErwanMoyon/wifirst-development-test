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
        console.log(response);
        sessionStorage.setItem("setting", JSON.stringify(response));
        console.log("success");
      }
    })
  }

  render() {
    const setting = JSON.parse(sessionStorage.getItem("setting")) || {};
    
    return (
      <div>
        <button onClick={this.backToHome}>Retour</button>
        <form onSubmit={this.updateSettings}>
          <label>
            Ville :
            <input
              ref={el => this.city = el}
              type="text"
              defaultValue={setting.city}
            />
          </label>
          <input type="submit" value="Sauvegarder" />
        </form>
      </div>
    )
  }
}
