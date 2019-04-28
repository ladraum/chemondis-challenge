import React from 'react';
import ReactDOM from 'react-dom';
import AlbumGrid from './AlbumGrid';

describe('AlbumGrid', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AlbumGrid />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
