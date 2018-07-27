import React from 'react';
import ReactDOM from 'react-dom';
import Results from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Results />, div);
  ReactDOM.unmountComponentAtNode(div);
});
