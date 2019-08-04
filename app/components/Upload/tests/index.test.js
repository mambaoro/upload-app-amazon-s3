import React from 'react';
import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Upload from '../index';

const mock = new MockAdapter(axios);

describe('<Upload />', () => {
  it('Should render div with testid "currentFilesDiv" once files are added to the state', () => {
    const { getByTestId } = render(<Upload />);
    fireEvent.change(getByTestId('input'), {
      target: {
        files: ['audio-demo.mp3', 'chucknorris.png', { type: 'image/png' }],
      },
    });
    expect(getByTestId('currentFilesDiv')).toBeDefined();
  });
  it('Should display an error message div element when an error occur during https post request', async () => {
    const { getByText, getByTestId } = render(<Upload />);
    fireEvent.change(getByTestId('input'), {
      target: {
        files: ['audio-demo.mp3', 'chucknorris.png', { type: 'image/png' }],
      },
    });
    fireEvent.click(getByText('Upload'));
    mock
      .onPost('/uploadMultiple')
      .reply(400, { error: 'Failed to upload files' });
    expect(getByTestId('error')).toBeDefined();
  });
});
