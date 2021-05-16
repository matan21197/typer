import React, { Component } from "react";
import Timer from "../Timer";
// import {TextViewComponent} from './TextViewComponent'
import "./TypingTextComponent.css";

const TextViewComponent = (props) => {
  return (<div>
        <span className="passedText">{props.text.slice(0,props.completelyFinishedIndex)}</span>
        <span className="passedText">{props.text.slice(props.completelyFinishedIndex, props.completelyFinishedIndex + props.currentlyValidIndex)}</span>
        <span className="failedText">{props.text.slice(props.completelyFinishedIndex + props.currentlyValidIndex, props.completelyFinishedIndex + props.currentTextIndex)}</span>
        <span className="remainingText">{props.text.slice(props.completelyFinishedIndex + props.currentTextIndex)}</span>
      </div>)
}

class TypingText extends Component {
  curText = "";
  completedWordsCount = 0;
  words = [];

  state = {
    passedText: "",
    curWord: "",
    curWordIndex: 0,
    currWordPassedText: "",
    failedText: "",
    remainingText: "",
    currentlyValidIndex: 0,
    currText: "",
    completelyFinishedIndex: 0,
    remainingTime: 0,
    wordSpeed: 0
  };

  constructor(props) {
    super(props);

    this.handleType = this.handleType.bind(this);
  }

  initGame() {
    console.log("init game");
    this.setState(
      {
        remainingText: this.props.text
      },
      () => {
        var textWithoutNewlines = this.props.text.replace(/(\r\n|\n|\r)/gm, "");
        this.words = textWithoutNewlines.split(" ");
        this.state.curWord = this.getNextWord();
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
    var wordToReturn = this.words[this.state.curWordIndex]
    this.setState({
      curWordIndex: this.state.curWordIndex + 1,
      curWord: wordToReturn})
  }

  componentDidMount() {
    this.initGame();
  }

  handleCompletedWord(word) {
    this.completedWordsCount++;
    this.setState(
      {
        completelyFinishedIndex: this.state.completelyFinishedIndex + word.length + 1,
        currentlyValidIndex: 0,
        remainingText: this.props.text.slice(this.state.passedText.length + this.state.curWord.length + 1),
        passedText: this.state.passedText + this.state.curWord + " ",
        currWordPassedText: ""
      },
      () => {
        this.setState({
          currText: ""
        })
          // this.setState({curWord: this.getNextWord()})
        this.getNextWord()
        if (!this.state.curWord) {
          console.log("finished");
        }
      }
    );
  }
  
  handleRegularType(newText) {
    var validIndex = 0
    while(validIndex < this.state.curWord.length &&
          newText[validIndex] == this.state.curWord[validIndex]) {
            validIndex++
          }
    this.setState({
      currText: newText,
      currWordPassedText: this.state.curWord.slice(0,validIndex),
      failedText: this.props.text.slice(this.state.passedText.length + validIndex,this.state.passedText.length + newText.length),
      remainingText: this.props.text.slice(newText.length/*this.state.currWordPassedText.length + this.state.failedText.length*/ + this.state.passedText.length)
    })
  }

  getCurrentPassedLength(newText) {
    var validIndex = 0
    while(validIndex < this.state.curWord.length &&
          newText[validIndex] == this.state.curWord[validIndex]) {
            validIndex++
          }
    return validIndex
  }

  handleType(event) {
    let newText = event.target.value;
    this.setState({
      currentlyValidIndex: this.getCurrentPassedLength(newText)
    })
    if (
      this.state.curWord + " " === newText 
    ) {
      // Handle completing a word
        this.handleCompletedWord(this.state.curWord);
      } else {
        this.handleRegularType(newText);
      }
  }

  
  render() {
    return (
      <div>
        <Timer></Timer>
        {/* <div>
          <span className="passedText">{this.state.passedText}</span>
          <span className="passedText">{this.state.currWordPassedText}</span>
          <span className="failedText">{this.state.failedText}</span>
          <span className="remainingText">{this.state.remainingText}</span>
        </div> */}
        <TextViewComponent text={this.props.text} 
                           currentTextIndex={this.state.currText.length} 
                           completelyFinishedIndex={this.state.completelyFinishedIndex} 
                           currentlyValidIndex={this.state.currentlyValidIndex}>
        </TextViewComponent>
        <input type="text" value={this.state.currText} onChange={this.handleType} />
        <h3> {"Wpm : " + this.state.wordSpeed}</h3>
        <div />
      </div>
    );
  }
}

export default TypingText;
