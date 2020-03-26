import React from 'react';
import { render } from '@testing-library/react';
import Features from './index';

describe('Features', () => {
  it.each([
    [
      'default',
      {
        playersFrom: 2,
        playersTo: 4,
        age: '4',
        duration: 'duration',
        simpleRules: false,
      },
    ],
    [
      'with simple rules',
      {
        playersFrom: 2,
        playersTo: 2,
        age: '4',
        duration: 'duration',
        simpleRules: true,
      },
    ],
  ])('should render %s', (_, props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { container } = render(<Features {...props} />);
    expect(container).toMatchSnapshot();
  });
});
