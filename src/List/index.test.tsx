import React from 'react';
import { render } from '@testing-library/react';
import List from './index';
import getGame from '../../mockData/test-games';

describe('List', () => {
  it('should render and match snapshot', () => {
    const games = [getGame()];
    const { container } = render(
      <List games={games} activeFilters={new Map()} setFilter={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
