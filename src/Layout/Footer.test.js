import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer type="ALBUM" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
