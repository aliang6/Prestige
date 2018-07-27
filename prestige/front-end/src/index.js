import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Results from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Results />, document.getElementById('root'));
registerServiceWorker();
