import React from 'react';

const Controls = () => {
  return(
    <div>
      <button id="start_stop"><i className="fas fa-play" title="start"></i></button>
      <button id="reset"><i className="fas fa-sync-alt" title="reset"></i></button>
    </div>
  );
}

export default Controls;