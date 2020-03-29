import React from 'react';
import { render } from '@testing-library/react';
import Header from './index';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
jest.mock('../Search', () => () => 'Search');

describe('Header', () => {
  it('should render and match snapshot', () => {
    const { container } = render(<Header setFilter={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
