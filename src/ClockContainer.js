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
      timeLeft: 25*60
    }

    this.handleLengthChangeByOne = this.handleLengthChangeByOne.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
  }

  handleLengthChangeByOne(type, change) {
    const key = type.toLowerCase() + 'Length';
    let newLength = this.state[key] + change;
    if (newLength <= 0 || newLength > 60) {
      newLength = this.state[key]
    }
    this.setState({ [key] : newLength });
  }
  
  handleLengthChange(e) {
    const key = e.target.id.split('-')[0] + 'Length';

    this.setState({ [key] : Number(e.target.value) });

    if (e.type === 'blur') {
      if (Number(e.target.value) <= 0) {
        this.setState({ [key] : 1 });
      } else if ( Number(e.target.value) > 60) {
        this.setState({ [key] : 60 });
      }
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
        <TimeDisplay time={this.state.timeLeft} type="Session"/>
        <Controls />
        <footer>Designed and coded by <a href="https://github.com/LauraBrandt">Laura Brandt</a></footer>
      </div>
    );
  }
}

export default ClockContainer;
