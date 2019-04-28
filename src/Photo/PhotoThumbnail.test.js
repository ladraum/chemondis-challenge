import React from 'react';
import ReactDOM from 'react-dom';
import PhotoThumbnail from './PhotoThumbnail';

describe('PhotoThumbnail', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PhotoThumbnail photoDetails={{}} owner={{}} openModal={() => { }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
