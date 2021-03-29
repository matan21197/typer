import React, { Component } from "react";
import { Dialog } from "@material-ui/core";
import "./PlaylistList.css";
import SongList from "./SongList";
import {SPOTIFY_GET_PLAYLIST_URL} from "../../../Urls";
import { PLAYLIST_PAGE_SIZE } from "../../../consts";
import InfiniteScroll from "react-infinite-scroller";
import noImage from "./no_image.png"

class PlaylistView extends Component {
  state = {};
  render() {
    const playlist = this.props.playlist;
    const image =
        <img
          className="playlist-image"
          src={playlist.images.length > 0 ? playlist.images[1].url : noImage}
          alt="spotify playlist"
        />

    return (
      <div className="playlist" onClick={this.props.onClick}>
        {image}
        <h2 className="playlist-title">{playlist.name}</h2>
      </div>
    );
  }
}

class PlaylistList extends Component {
  state = {
    loadMorePlaylists:true,
    playlists: [],
    lastPage: 0,
    openDialog: false,
    chosenPlaylist: {}
  };

  getUserPlaylists(page) {
    let url = new URL(SPOTIFY_GET_PLAYLIST_URL);
    let params = {
      offset: PLAYLIST_PAGE_SIZE * (page - 1),
      limit: PLAYLIST_PAGE_SIZE
    };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
      headers: {
        Authorization: "Bearer " + this.props.accessToken
      }
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          this.setState({
            playlists: [...this.state.playlists, ...result.items],
            lastPage: page,
            loadMore: result.next != null
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  renderPlaylists() {
    return this.state.playlists.map((playlist, i) => {
      return (
        <PlaylistView
          onClick={() => {
            this.setState({ openDialog: true, chosenPlaylist: playlist });
          }}
          key={playlist.id}
          playlist={playlist}
        ></PlaylistView>
      );
    });
  }

  renderInfiniteScroll() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={page => this.getUserPlaylists(page)}
        hasMore={this.state.loadMorePlaylists}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <div className="tracks">{this.renderPlaylists()}</div>
      </InfiniteScroll>
    );
  }

  renderDialog() {
    return (
      <Dialog
        scroll="paper"
        open={this.state.openDialog}
        onClose={() => {
          this.setState({ openDialog: false });
        }}
      >
        <SongList
          accessToken={this.props.accessToken}
          playlist={this.state.chosenPlaylist}
        ></SongList>
      </Dialog>
    );
  }

  render() {
    return <div className="playlists">
      {this.renderInfiniteScroll()}
      {this.renderDialog()}
      </div>;
  }
}

export default PlaylistList;
