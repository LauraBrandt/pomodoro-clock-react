import React from 'react';
import TimeSetting from './Components/TimeSetting';
import TimeDisplay from './Components/TimeDisplay';
import './ClockContainer.css';

class ClockContainer extends React.Component {
  render() {
    return (
      <div className="clock-container">
        <header>
          <h1>Pomodoro Clock</h1>
        </header>
        <div className="settings">
          <TimeSetting type="Session" length={25} />
          <TimeSetting type="Break" length={5} />
        </div>
        <TimeDisplay time={60}/>
      </div>
    );
  }
}

export default ClockContainer;
