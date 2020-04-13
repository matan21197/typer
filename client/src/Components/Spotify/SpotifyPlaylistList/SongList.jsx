import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { SONG_PAGE_SIZE, MUSIXMATCH_API_KEY } from "../../../consts";
import { MUSIXMATCH_LYRICS_URL, MUSIXMATCH_SEARCH_URL } from "../../../Urls";
import swal from 'sweetalert'
import {Redirect} from 'react-router-dom'

class SongList extends Component {
  state = {
    lyrics: "",
    lyricsChosen : false,
    lastPage: 0,
    songs: []
  };

  selectSong = async(songName, artistName) => {
    // search for song
    var searchResults = await this.searchForSong(songName, artistName)
    
    // handle a case with no results
    if(searchResults.message.body.track_list.length === 0) {
      console.log("no results") // TODO : prompt
      swal("no results found")
      return
    }
    
    var trackId = searchResults.message.body.track_list[0].track.track_id

    // get lyrics for first find
    var lyricsObject = await this.getSongLyrics(trackId)
    var lyrics = lyricsObject.message.body.lyrics.lyrics_body
    // go to game page with lyrics as information
    console.log(lyrics)
    this.setState({lyricsChosen : true,
                    lyrics: lyrics})
  }

  searchForSong = async(songName, artistName) => {
    let url = new URL(MUSIXMATCH_SEARCH_URL);
    let params = {
      q_track: songName,
      q_artist: artistName,
      f_has_lyrics: true,
      apikey: MUSIXMATCH_API_KEY
    };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    var res =  await fetch(url)
    return await res.json()
  }

  getSongLyrics = async(trackId) => {
    let url = new URL(MUSIXMATCH_LYRICS_URL);
    let params = {
      track_id: trackId,
      apikey: MUSIXMATCH_API_KEY
    };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    var res  = await fetch(url)
    return await res.json()
  }

  getPlaylistSongs(page) {
    let url = new URL(this.props.playlist.tracks.href);
    let params = { offset: SONG_PAGE_SIZE * (page - 1), limit: SONG_PAGE_SIZE };
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
            songs: [...this.state.songs, ...result.items],
            lastPage: page
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    if (this.state.lyricsChosen === true) {
      return <Redirect to={{pathname: '/game',
                            state: {lyrics: this.state.lyrics}}} />
    }

    const songList = this.state.songs.map((song, i) => {
      const track = song.track;
      return (
        <div key={track.id} onClick={() => this.selectSong(track.name, track.artists[0].name)}>
          {track.name}
        </div>
      );
    });
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={page => {
          this.getPlaylistSongs(page);
        }}
        hasMore={
          this.state.lastPage * SONG_PAGE_SIZE <
          this.props.playlist.tracks.total
        }
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        <div className="tracks">{songList}</div>
      </InfiniteScroll>
    );
  }
}

export default SongList;
