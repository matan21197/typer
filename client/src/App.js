import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TypingTextComponent from "./Components/TypingTextComponent/TypingTextComponent";
import SpotifyPage from './Components/Spotify/SpotifyPage'
import Navbar from "./Components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";

class App extends Component {
  state = {
    // text:
    //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sodales interdum dui. Sed id lacus rutrum, imperdiet purus sed, pulvinar nisl. Aenean rutrum arcu purus, in pellentesque quam tincidunt eget. Vestibulum ultrices, massa sit amet consequat auctor, ligula orci rhoncus enim, eu consectetur elit tellus a neque. Nullam eleifend sapien vitae turpis ullamcorper, eu viverra massa placerat"
    text:
      "I have felt as bleak as I've felt since puberty, and have filled almost three Mead notebooks trying to figure out whether it was Them or Just Me."
  };
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
            render={props => <TypingTextComponent text={this.state.text} />}
          />
          <Route 
            path='/spotify'   
            render={props=> <SpotifyPage />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
