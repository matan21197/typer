import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class SpotifyLoginComponent extends Component {
  state = {};

  render() {
    return (
      <div>
        {
          <div className="container">
            <div id="login">
              <a
                style={{textDecoration: "none"}}
                href="http://localhost:3001/api/spotify/login"
              >
                <Button variant="contained" color="secondary">
                  Log in with Spotify
                </Button>
              </a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default SpotifyLoginComponent;
