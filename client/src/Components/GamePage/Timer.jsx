import React, { Component } from 'react';
class Timer extends Component {
    state = { elapsedTime: 0 }

    componentDidMount() {    
      this.timerInterval = setInterval(() => {
        this.setState(
          {
            elapsedTime: this.state.elapsedTime+1
          }
        );
      }, 1000);
    }

    render() { 
        return (<div>
            <h3>
            {Math.floor(this.state.elapsedTime / 60).toString() +
              ":" +
              (this.state.elapsedTime % 60)}
          </h3>
        </div> );
    }
}
 
export default Timer;