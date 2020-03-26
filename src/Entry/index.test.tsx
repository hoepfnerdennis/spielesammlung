import React from 'react';
import { render } from '@testing-library/react';
import Entry from './index';
import useIntersection from './intersection';

jest.mock('../Features/index.tsx', () => (): string => 'Features');
jest.mock('./intersection.ts');

describe('Entry', () => {
  it.each([
    [
      'with intersection',
      true,
      {
        id: 'id',
        name: 'name',
        description: 'description',
        playersFrom: 2,
        playersTo: 4,
        age: '4',
        duration: 'duration',
        favorite: false,
        simpleRules: false,
        image: 'image',
      },
    ],
    [
      'with favorite',
      true,
      {
        id: 'id',
        name: 'name',
        description: 'description',
        playersFrom: 2,
        playersTo: 4,
        age: '4',
        duration: 'duration',
        favorite: true,
        simpleRules: false,
        image: 'image',
      },
    ],
    [
      'default',
      false,
      {
        id: 'id',
        name: 'name',
        description: 'description',
        playersFrom: 2,
        playersTo: 4,
        age: '4',
        duration: 'duration',
        favorite: false,
        simpleRules: false,
        image: 'image',
      },
    ],
  ])('should render %s', (_, intersecting, game) => {
    // @ts-ignore
    useIntersection.mockImplementation(() => intersecting);
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { container } = render(<Entry {...game} />);
    expect(container).toMatchSnapshot();
  });
});
