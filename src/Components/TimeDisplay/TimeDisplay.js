import React from 'react';
import './TimeDisplay.css';

const TimeDisplay = ({type, time}) => {
  return(
    <div class='time-display'>
      <label htmlFor="time-left" id="timer-label">{type}</label>
      <div id="time-left">{time}</div>
    </div>
  );
}

export default TimeDisplay;