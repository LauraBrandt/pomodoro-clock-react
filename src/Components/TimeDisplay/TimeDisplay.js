import React from 'react';
import './TimeDisplay.css';

const TimeDisplay = ({type, time}) => {
  return(
    <div className='time-display'>
      <div className='time-display-fill'></div>
      <label htmlFor="time-left" id="timer-label">{type}</label>
      <div id="time-left">{time}</div>
    </div>
  );
}

export default TimeDisplay;