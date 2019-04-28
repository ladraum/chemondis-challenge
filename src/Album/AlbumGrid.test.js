import React from 'react';
import ReactDOM from 'react-dom';
import AlbumGrid from './AlbumGrid';
import TestRenderer from "react-test-renderer";

describe('AlbumGrid', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AlbumGrid />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
