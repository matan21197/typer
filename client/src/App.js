import React, { Component } from "react";
import "./App.css";
import SpotifyPage from './Components/Spotify/SpotifyPage'
import Navbar from "./Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import GamePage from "./Components/GamePage/GamePageComponent";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact 
            path="/"  
            component={Home} 
          />
          <Route
            path="/game"
            render={props => <GamePage {...props}/>}
          />
          <Route 
            path='/spotify'   
            render={props => <SpotifyPage />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
