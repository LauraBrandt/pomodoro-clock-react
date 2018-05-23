import React from 'react';
import TimeSetting from './Components/TimeSetting/TimeSetting';
import TimeDisplay from './Components/TimeDisplay/TimeDisplay';
import Controls from './Components/Controls/Controls';
import './ClockContainer.css';

class ClockContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timeLeft: 25*60,
      endTime: 0,
      isRunning: false,
      current: 'session'
    }

    this.countdown = this.countdown.bind(this);
    this.timer = this.timer.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleLengthChangeByOne = this.handleLengthChangeByOne.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
  }

  countdown() {
    const secondsLeft = Math.round((this.state.endTime - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(this.countdownInterval);

        if (this.state.current === 'session') {
          this.setState({
            current: 'break',
            timeLeft: this.state.breakLength * 60
          });
        } else {
          this.setState({ 
            current: 'session',
            timeLeft: this.state.sessionLength * 60
          });
        }

        this.timer();
        return;
      }

      this.setState({timeLeft: secondsLeft});
  }

  timer() {
    const endTime = Date.now() + (this.state.timeLeft * 1000); // in ms
    this.setState({ endTime });

    this.countdownInterval = setInterval(this.countdown, 1000);
  }

  handleReset() {
    clearInterval(this.countdownInterval);
    
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timeLeft: 25*60,
      isRunning: false,
      current: 'session'
    });
  }

  handleStartStop() {
    const isRunning = !this.state.isRunning;

    this.setState({ isRunning });

    if (isRunning) {
      this.timer(); // play
    } else {
      clearInterval(this.countdownInterval); // pause
    }
  }

  handleLengthChangeByOne(type, change) {
    if (this.state.isRunning) return;

    const key = type.toLowerCase() + 'Length';
    let newLength = this.state[key] + change;
    
    if (newLength <= 0 || newLength > 60) {
      newLength = this.state[key]
    }

    const isChangingCurrentType = type.toLowerCase() === this.state.current;

    this.setState({ 
      [key] : newLength,
      timeLeft : isChangingCurrentType ? newLength * 60 : this.state.timeLeft
    });
  }
  
  handleLengthChange(e) {
    if (this.state.isRunning) return;

    const type = e.target.id.split('-')[0];
    const key = type + 'Length';
    let newLength = Number(e.target.value);

    this.setState({ [key] : newLength });

    if (e.type === 'blur') {
      if (Number(e.target.value) <= 0) {
        newLength = 1;
      } else if ( Number(e.target.value) > 60) {
        newLength = 60;
      }

      const isChangingCurrentType = type === this.state.current;

      this.setState({
        [key] : newLength,
        timeLeft : isChangingCurrentType ? newLength * 60 : this.state.timeLeft
      });
    }
  }

  render() {
    return (
      <div className="clock-container">
        <header>
          <h1>Pomodoro Clock</h1>
        </header>
        <div className="settings">
          <TimeSetting 
            type="Session" 
            length={this.state.sessionLength} 
            handleChangeByOne={this.handleLengthChangeByOne}
            handleChange={this.handleLengthChange}
            isRunning={this.state.isRunning}
          />
          <TimeSetting 
            type="Break" 
            length={this.state.breakLength} 
            handleChangeByOne={this.handleLengthChangeByOne}
            handleChange={this.handleLengthChange}
            isRunning={this.state.isRunning}
          />
        </div>
        <TimeDisplay 
          time={this.state.timeLeft} 
          type={this.state.current}
          isRunning={this.state.isRunning}
        />
        <Controls 
          isRunning={this.state.isRunning} 
          reset={this.handleReset} 
          handleStartStop={this.handleStartStop}
        />
        <footer>Designed and coded by <a href="https://github.com/LauraBrandt">Laura Brandt</a></footer>
      </div>
    );
  }
}

export default ClockContainer;
