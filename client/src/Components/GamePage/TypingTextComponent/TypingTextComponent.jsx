import React, { Component } from "react";
import "./TypingTextComponent.css";

class TypingText extends Component {
  curText = "";
  curWord = "";
  completedWordsCount = 0;
  words = [];
  curWordIndex = 0;

  state = {
    passedText: "",
    currWordPassedText: "",
    failedText: "",
    remainingText: "",
    currText: "",
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
        var textWithoutNewlines = this.props.text.replace(/(\r\n|\n|\r)/gm, "");
        this.words = textWithoutNewlines.split(" ");
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
    // let nextSpaceIndex = Math.min(this.state.remainingText.indexOf(" "), this.state.remainingText.indexOf('\n'));
    // if (nextSpaceIndex !== -1) {
    //   return this.state.remainingText.substr(0, nextSpaceIndex);
    // }
    // if (this.state.remainingText) {
    //   return this.state.remainingText;
    // }
    // return null;
    return this.words[this.curWordIndex++]
  }

  componentDidMount() {
    this.initGame();
  }

  
  handleType(event) {
    let newText = event.target.value;
    
    if (
      event.target.value[event.target.value.length - 1] === " "  &&
      this.curWord === newText.slice(0, -1)
    ) {
      // Handle completing a word
      this.completedWordsCount++;
      this.setState(
        {
          remainingText: this.props.text.slice(this.state.passedText.length + this.curWord.length + 1),
          passedText: this.state.passedText + this.curWord + " ",
          currWordPassedText: ""
        },
        () => {
          this.setState({
            currText: ""
          })
          this.curWord = this.getNextWord();
          if (!this.curWord) {
            console.log("finished");
          }
        }
      );
      } else {
        var validIndex = 0
        while(validIndex < this.curWord.length &&
              newText[validIndex] == this.curWord[validIndex]) {
                validIndex++
              }
        this.setState({
          currText: newText,
          currWordPassedText: this.curWord.slice(0,validIndex),
          failedText: this.props.text.slice(this.state.passedText.length + validIndex,this.state.passedText.length + newText.length),
          remainingText: this.props.text.slice(newText.length/*this.state.currWordPassedText.length + this.state.failedText.length*/ + this.state.passedText.length)
        })
        
      }
    // // Handle backspace
    // if (newText.length < this.curText.length) {
    //   var remainingText = this.state.remainingText
    //   var failedText = this.state.failedText
    //   var passedText = this.state.passedText

    //   if (this.state.failedText !== "") {
    //     remainingText = this.state.failedText[this.state.failedText.length - 1] + this.state.remainingText
    //     failedText = this.state.failedText.slice(0, -1)
    //   } else {
    //     remainingText = this.state.passedText[this.state.passedText.length - 1] + this.state.remainingText
    //     passedText = this.state.passedText.slice(0, -1)
    //   }

    //   this.setState({
    //     remainingText: remainingText,
    //     failedText: failedText,
    //     passedText: passedText
    //   })
    //   this.curText = newText;
    //   return;
    // }

    // this.curText = newText;

    // // The text currently matches the word
    // if (this.curWord.startsWith(this.curText)) {
    //   this.setState({
    //     remainingText: this.state.remainingText.substr(1),
    //     passedText: this.state.passedText + this.state.remainingText[0]
    //   });
    // } else {
    //   if (
    //     event.target.value[event.target.value.length - 1] === " "  &&
    //     this.curWord === this.curText.slice(0, -1)
    //   ) {
    //     // Handle completing a word
    //     event.target.value = "";
    //     this.completedWordsCount++;
    //     this.setState(
    //       {
    //         remainingText: this.state.remainingText.substr(1),
    //         passedText: this.state.passedText + this.state.remainingText[0]
    //       },
    //       () => {
    //         this.curText = "";
    //         this.curWord = this.getNextWord();
    //         if (!this.curWord) {
    //           console.log("finished");
    //         }
    //       }
    //     );
    //   } else {
    //     // Handle marking the text as invalid
    //     this.setState({
    //       remainingText: this.state.remainingText.substr(1),
    //       failedText: this.state.failedText + this.state.remainingText[0]
    //     });
    //   }
    // }
  }

  render() {
    return (
      <div>
        <div>
          <span className="passedText">{this.state.passedText}</span>
          <span className="passedText">{this.state.currWordPassedText}</span>
          <span className="failedText">{this.state.failedText}</span>
          <span className="remainingText">{this.state.remainingText}</span>
        </div>
        <input type="text" value={this.state.currText} onChange={this.handleType} />
        <h3> {"Wpm : " + this.state.wordSpeed}</h3>
        <div />
      </div>
    );
  }
}

export default TypingText;
