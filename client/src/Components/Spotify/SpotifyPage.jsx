import React, { Component } from "react";
import SpotifyLoginComponent from './SpotifyLoginComponent/SpotifyLoginComponent'
import PlaylistList from "./SpotifyPlaylistList/PlaylistList";

class SpotifyPage extends Component {
  state = {    
    accessToken: null,
    refreshToken: null,
  };

  componentDidMount() {
    var params = this.getHashes();
    if (params.error ) {
    } else if (params.access_token){
      this.setState({
        accessToken: params.access_token,
        refreshToken: params.refresh_token
      });
    }
  }

  getHashes() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    const isLoggedIn = this.state.accessToken != null
    const componentToShow = isLoggedIn ?
      <PlaylistList accessToken={this.state.accessToken}></PlaylistList> :
      <SpotifyLoginComponent></SpotifyLoginComponent>
    return (
      <div>
        {componentToShow}
      </div>
    );
  }
}

export default SpotifyPage;
