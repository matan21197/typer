import React, { Component } from 'react';
class Timer extends Component {
    state = { remainingTime: 0 }

    gameStart() {
        this.setState(
            {
              remainingTime: this.props.time
            },
            () => {
              this.timerInterval = setInterval(() => {
                this.setState(
                  {
                    remainingTime: this.state.remainingTime - 1
                  },
                  () => {
                    // update speed every three seconds
                    this.setState({
                      wordSpeed: this.getWordSpeed(this.props.time)
                    });
                  }
                );
              }, 1000);
            }
          );
    }

    render() { 
        return (<div>
            <h3>
            {Math.floor(this.state.remainingTime / 60).toString() +
              ":" +
              (this.state.remainingTime % 60)}
          </h3>
        </div> );
    }
}
 
export default Timer;