import React from 'react';
import PropTypes from 'prop-types';
import './TimeDisplay.css';

export function formatTime(seconds) {
  const minutes = Math.floor(seconds/60);
  const secondsRemaining = seconds % 60;
  return `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
}

const TimeDisplay = ({type, time, percentHeight}) => {
  return(
    <div className='time-display'>
      <div className='time-display-fill' style={{height: `${percentHeight}%`}}></div>
      <label htmlFor="time-left" id="timer-label">{type}</label>
      <div id="time-left">{formatTime(time)}</div>
    </div>
  );
}

TimeDisplay.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentHeight: PropTypes.number
}

export default TimeDisplay;