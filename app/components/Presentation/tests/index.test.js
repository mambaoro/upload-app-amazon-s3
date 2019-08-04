import React from 'react';
import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';

import { render } from '@testing-library/react';

import Presentation from '../index';

describe('<Presentation />', () => {
  it('Should render "Section" component', () => {
    const { getByTestId } = render(<Presentation />);
    expect(getByTestId('section')).toBeDefined();
  });
  it('should render an element article', () => {
    const { getByTestId } = render(<Presentation />);
    expect(getByTestId('article')).toBeDefined();
  });
  it('should render specified text inside the h1', () => {
    const { getByText } = render(<Presentation />);
    const text = "Hi, it's Mamadou Baoro";
    expect(getByText(text)).toBeDefined();
  });
  it('should render a paragraph', () => {
    const { getByText } = render(<Presentation />);
    const text =
      'In this application you can upload multiple files to the powerful cloud storage Amazon S3. To avoid any extra cost I limited the file size to 15mb per file. When you upload a file you will get a link back, then you can use it wherever you want. Enjoy the demo!';
    expect(getByText(text)).toBeDefined();
  });
});
