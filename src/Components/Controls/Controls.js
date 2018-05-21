import React from 'react';
import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({isRunning, reset, handleStartStop}) => {
  return(
    <div className="controls">
      <button id="start_stop" title={`${isRunning ? 'Stop' : 'Start'}`} onClick={handleStartStop}>
        <i className={`fas fa-${isRunning ? 'pause' : 'play'}`} title={`${isRunning ? 'Stop' : 'Start'}`}></i>
      </button>
      <button id="reset" title="Reset" onClick={reset}>
        <i className="fas fa-sync-alt" title="reset"></i>
      </button>
    </div>
  );
}

Controls.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  handleStartStop: PropTypes.func.isRequired
}

export default Controls;