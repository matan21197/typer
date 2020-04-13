import React, { Component } from "react";

class SpotifyLoginComponent extends Component {
  state = {};

  render() {
    return (
      <div>
        {
          <div className="container">
            <div id="login">
              <h1>This is an example of the Authorization Code flow</h1>
              <a
                href="http://localhost:3001/api/spotify/login"
                className="btn btn-primary"
              >
                Log in with Spotify
              </a>
            </div>
            <div id="loggedin">
              <div id="user-profile" />
              <div id="oauth" />
              <button
                className="btn btn-default"
                id="obtain-new-token"
                onClick={this.openSpotifyLogin}
              >
                Obtain new token using the refresh token
              </button>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default SpotifyLoginComponent;
