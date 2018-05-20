import React from 'react';

const TimeDisplay = ({type, time}) => {
  return(
    <div>
      <label htmlFor="time-left" id="timer-label">{type}</label>
      <div id="time-left">{time}</div>
    </div>
  );
}

export default TimeDisplay;