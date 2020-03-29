import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filters from './index';
import { ActiveFiltersMap, FilterKey } from '../Store/types';
import getGame from '../../mockData/test-games';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-explicit-any
jest.mock('../Layer/index', () => ({ children, closeLayer }: any) => (
  <button onClick={closeLayer} data-testid="layer" type="button">
    {children}
  </button>
));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
jest.mock('../Select', () => () => 'Select');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
jest.mock('../Checkbox', () => () => 'Checkbox');

describe('Filters', () => {
  it.each([
    ['no active filter', new Map()],
    ['favorite selected', new Map().set(FilterKey.favorite, 'true')],
  ])('should render %s', (_, activeFilters) => {
    const games = [getGame(), getGame(), getGame(), getGame()];
    const setFilter = jest.fn();
    const { container, getByText } = render(
      <Filters activeFilters={activeFilters} games={games} setFilter={setFilter} />
    );
    fireEvent.click(getByText('Filter anzeigen'));
    expect(container).toMatchSnapshot();
  });
  it('should open and close layer', () => {
    const activeFilters: ActiveFiltersMap = new Map();
    const games = [getGame(), getGame(), getGame(), getGame()];
    const setFilter = jest.fn();
    const { container, getByText, getByTestId } = render(
      <Filters activeFilters={activeFilters} games={games} setFilter={setFilter} />
    );
    fireEvent.click(getByText('Filter anzeigen'));
    expect(container).toMatchSnapshot();

    fireEvent.click(getByTestId('layer'));
    expect(container).toMatchSnapshot();
  });
});
