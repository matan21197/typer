import React, { Component } from "react";
import "./TypingTextComponent.css";

class TypingText extends Component {
  curText = "";
  curWord = "";
  completedWordsCount = 0;

  state = {
    passedText: "",
    failedText: "",
    remainingText: "",
    remainingTime: 0,
    wordSpeed: 0
  };

  constructor(props) {
    super(props);

    this.handleType = this.handleType.bind(this);
  }

  initGame() {
    var gameLength = 180;

    console.log("init game");
    this.setState(
      {
        remainingText: this.props.text
      },
      () => {
        this.curWord = this.getNextWord();
      }
    );

    
  }

  updateWpm() {}

  /**
   * Returns the current speed of the game
   * @param {number} gameLength - the total length of the game
   */
  getWordSpeed(gameLength) {
    return Math.round(
      this.state.passedText.length /
        ((gameLength - this.state.remainingTime) / 60) /
        5
    );
  }

  getNextWord() {
    let nextSpaceIndex = Math.min(this.state.remainingText.indexOf(" "), this.state.remainingText.indexOf('\n'));
    if (nextSpaceIndex !== -1) {
      return this.state.remainingText.substr(0, nextSpaceIndex);
    }
    if (this.state.remainingText) {
      return this.state.remainingText;
    }
    return null;
  }

  componentDidMount() {
    this.initGame();
  }

  
  handleType(event) {
    let newText = event.target.value;

    // Handle backspace
    if (newText.length < this.curText.length) {
      if (this.state.failedText !== "") {
        this.setState({
          remainingText:
            this.state.failedText[this.state.failedText.length - 1] +
            this.state.remainingText,
          failedText: this.state.failedText.slice(0, -1)
        });
      } else {
        this.setState({
          remainingText:
            this.state.passedText[this.state.passedText.length - 1] +
            this.state.remainingText,
          passedText: this.state.passedText.slice(0, -1)
        });
      }

      this.curText = newText;
      return;
    }

    this.curText = newText;

    // The text currently matches the word
    if (this.curWord.startsWith(this.curText)) {
      this.setState({
        remainingText: this.state.remainingText.substr(1),
        passedText: this.state.passedText + this.state.remainingText[0]
      });
    } else {
      if (
        event.target.value[event.target.value.length - 1] === " "  &&
        this.curWord === this.curText.slice(0, -1)
      ) {
        // Handle completing a word
        event.target.value = "";
        this.completedWordsCount++;
        this.setState(
          {
            remainingText: this.state.remainingText.substr(1),
            passedText: this.state.passedText + this.state.remainingText[0]
          },
          () => {
            this.curText = "";
            this.curWord = this.getNextWord();
            if (!this.curWord) {
              console.log("finished");
            }
          }
        );
      } else {
        // Handle marking the text as invalid
        this.setState({
          remainingText: this.state.remainingText.substr(1),
          failedText: this.state.failedText + this.state.remainingText[0]
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <span className="passedText">{this.state.passedText}</span>
          <span className="failedText">{this.state.failedText}</span>
          <span className="remainingText">{this.state.remainingText}</span>
        </div>
        <input type="text" onChange={this.handleType} />

        <h3> {"Wpm : " + this.state.wordSpeed}</h3>
        <div />
      </div>
    );
  }
}

export default TypingText;
