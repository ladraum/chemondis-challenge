import React from 'react';
import ReactDOM from 'react-dom';
import TopMenu from './TopMenu';

describe('TopMenu', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
