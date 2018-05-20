import React from 'react';
import TimeSetting from './Components/TimeSetting';
import TimeDisplay from './Components/TimeDisplay';
import Controls from './Components/Controls';
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
        <TimeDisplay time="25:00" type="Session"/>
        <Controls />
        <footer>Designed and coded by <a href="https://github.com/LauraBrandt">Laura Brandt</a></footer>
      </div>
    );
  }
}

export default ClockContainer;
