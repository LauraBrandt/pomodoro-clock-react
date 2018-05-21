import React from 'react';
import PropTypes from 'prop-types';
import './TimeSetting.css';

const TimeSetting = ({type, length}) => {
  return(
    <div className="time-setting">
      <label htmlFor={`${type && type.toLowerCase()}-length`} id={`${type && type.toLowerCase()}-label`}>{type} Length</label>
      <div className="length-controls">
        <button id={`${type && type.toLowerCase()}-decrement`}><i className="fas fa-minus" title="minus"></i></button>
        <input 
          id={`${type && type.toLowerCase()}-length`} 
          type="number" 
          value={length}
        />
        <button id={`${type && type.toLowerCase()}-increment`}><i className="fas fa-plus" title="plus"></i></button>
      </div>
    </div>
  );
}

TimeSetting.propTypes = {
  type: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired
}

export default TimeSetting;