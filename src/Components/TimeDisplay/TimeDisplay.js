import React from 'react';
import PropTypes from 'prop-types';
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

TimeDisplay.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default TimeDisplay;