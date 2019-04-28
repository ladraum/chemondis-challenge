import React from 'react';
import ReactDOM from 'react-dom';
import AlbumThumbnail from './AlbumThumbnail';

describe('AlbumThumbnail', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AlbumThumbnail albumDetails={{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
