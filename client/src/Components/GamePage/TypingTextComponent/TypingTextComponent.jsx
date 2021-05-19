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
    curWord: "",
    curWordIndex: 0,
    currWordPassedText: "",
    currentlyValidIndex: 0,
    currText: "",
    completelyFinishedIndex: 0,
    remainingTime: 0,
    isGameOngoing: false
  };

  constructor(props) {
    super(props)
    this.handleType = this.handleType.bind(this);
  }

  initWords() {
    var textWithoutNewlines = this.props.text.replaceAll(/(\r\n|\n|\r)/g, " ");
    this.words = textWithoutNewlines.split(" ");
    this.getNextWord();
  }

  initGame() {
    console.log("init game");  
    this.initWords()
    this.setState({isGameOngoing: true})
  }

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

  handleCompletedWord(word) {
    this.completedWordsCount++;
    this.setState(
      {
        completelyFinishedIndex: this.state.completelyFinishedIndex + word.length + 1,
        currentlyValidIndex: 0,
        currWordPassedText: ""
      },
      () => {
        this.setState({
          currText: ""
        })
        this.getNextWord()
        if (this.state.curWord === null) {
          this.setState({isGameOngoing: false})
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
        {this.state.isGameOngoing ?
          <div>
        <Timer></Timer>
        <TextViewComponent text={this.props.text} 
                           currentTextIndex={this.state.currText.length} 
                           completelyFinishedIndex={this.state.completelyFinishedIndex} 
                           currentlyValidIndex={this.state.currentlyValidIndex}>
        </TextViewComponent>
        <input type="text" value={this.state.currText} onChange={this.handleType} />
        <h3> {"Wpm : " + this.state.wordSpeed}</h3>
        </div>
        : 
          <button onClick={() => this.initGame()}>Start Game!!</button>
        }
        <div />
      </div>
    );
  }
}

export default TypingText;
