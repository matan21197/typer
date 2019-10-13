import React, { Component } from "react";

class Home extends Component {
  state = {
    asd: ""
  };

  render() {
    return (
      <div id="home">
        <h1>{this.state.asd}</h1>
      </div>
    );
  }
}

export default Home;
