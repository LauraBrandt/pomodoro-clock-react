import React from 'react';
import PropTypes from 'prop-types';
import './TimeSetting.css';

const TimeSetting = ({type, length, handleChangeByOne, handleChange}) => {
  return(
    <div className="time-setting">
      <label htmlFor={`${type && type.toLowerCase()}-length`} id={`${type && type.toLowerCase()}-label`}>{type} Length</label>
      <div className="length-controls">
        <button id={`${type && type.toLowerCase()}-decrement`} onClick={handleChangeByOne.bind(this, type, -1)}>
          <i className="fas fa-minus" title="minus"></i>
        </button>
        <input 
          id={`${type && type.toLowerCase()}-length`} 
          type="number" 
          value={length}
          onChange={handleChange}
          onBlur={handleChange}
          min="0"
          max="60"
        />
        <button id={`${type && type.toLowerCase()}-increment`}  onClick={handleChangeByOne.bind(this, type, 1)}>
          <i className="fas fa-plus" title="plus"></i>
        </button>
      </div>
    </div>
  );
}

TimeSetting.propTypes = {
  type: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  handleChangeByOne: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default TimeSetting;