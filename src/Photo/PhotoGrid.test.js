import React from 'react';
import ReactDOM from 'react-dom';
import PhotoGrid from './PhotoGrid';

describe('PhotoGrid', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PhotoGrid />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
