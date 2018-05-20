import React from 'react';

const TimeSetting = ({type, length}) => {
  return(
    <div>
      <label htmlFor={`${type && type.toLowerCase()}-length`} id={`${type && type.toLowerCase()}-label`}>{type} Length</label>
      <div>
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

export default TimeSetting;