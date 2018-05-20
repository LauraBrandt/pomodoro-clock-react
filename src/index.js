import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ClockContainer from './ClockContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ClockContainer />, document.getElementById('root'));
registerServiceWorker();
