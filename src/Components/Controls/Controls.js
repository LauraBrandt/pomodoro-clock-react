import React from 'react';
import './Controls.css';

const Controls = () => {
  return(
    <div className="controls">
      <button id="start_stop" title="Start"><i className="fas fa-play" title="start"></i></button>
      <button id="reset" title="Reset"><i className="fas fa-sync-alt" title="reset"></i></button>
    </div>
  );
}

export default Controls;