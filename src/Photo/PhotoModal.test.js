import React from 'react';
import ReactDOM from 'react-dom';
import PhotoModal from './PhotoModal';

describe('PhotoModal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PhotoModal modalDetails={{ isOpen: false }} closeModal={() => { }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
