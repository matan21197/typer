import TypingText from "./TypingTextComponent/TypingTextComponent";
import React, { Component } from "react";

class GamePage extends Component {
  state = {
    text:
      "I have felt as bleak as I've felt since puberty, " +
      "and have filled almost three Mead notebooks trying " +
      "to figure out whether it was Them or Just Me."
  };

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.lyrics) {
      this.setState({text: this.props.location.state.lyrics})
    }
  }

  render() {
    return <div>
      <TypingText text={this.state.text} />
    </div>;
  }
}

export default GamePage;
