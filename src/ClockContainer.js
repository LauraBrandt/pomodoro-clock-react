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
      isRunning: false,
      current: 'session',
    }

    this.handleReset = this.handleReset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleLengthChangeByOne = this.handleLengthChangeByOne.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
  }

  handleReset() {
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timeLeft: 25*60,
      isRunning: false,
      current: 'session',
    });
  }

  handleStartStop() {
    this.setState(prevState => ({
      isRunning: !prevState.isRunning
    }));
  }

  handleLengthChangeByOne(type, change) {
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
          />
          <TimeSetting 
            type="Break" 
            length={this.state.breakLength} 
            handleChangeByOne={this.handleLengthChangeByOne}
            handleChange={this.handleLengthChange}
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
