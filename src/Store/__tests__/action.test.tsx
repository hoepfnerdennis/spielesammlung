// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { wait, render, fireEvent } from '@testing-library/react';
import data from '../../../mockData/test-data.json';
import { FilterKey } from '../types';
import { useFetchGames, useSetFilter } from '../action';
import { GamesProvider, useGames } from '../GamesStore';
import { useFilters, FiltersProvider } from '../FiltersStore';

describe('useData', () => {
  it('should fetch data', async () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) }));

    const Hook = (): JSX.Element => {
      useFetchGames();
      const games = useGames();
      return <div data-testid="games" data-count={games.length} />;
    };

    const { getByTestId } = render(
      <GamesProvider>
        <Hook />
      </GamesProvider>
    );

    await wait(() => getByTestId('games'));

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(getByTestId('games').dataset.count).toBe('6');
  });

  it('should handle error when fetching data', async () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    window.fetch = jest.fn(() => Promise.reject());

    const Hook = (): JSX.Element => {
      useFetchGames();
      const games = useGames();
      return <div data-testid="games" data-count={games.length} />;
    };

    const { getByTestId } = render(
      <GamesProvider>
        <Hook />
      </GamesProvider>
    );

    await wait(() => getByTestId('games'));

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(getByTestId('games').dataset.count).toBe('0');
  });

  it('should set filter', () => {
    const Hook = (): JSX.Element => {
      useFetchGames();
      const filters = useFilters();
      const setFilter = useSetFilter();
      const add = (): void => setFilter(FilterKey.name)('search');
      const remove = (): void => setFilter(FilterKey.name)();
      return (
        <div>
          <div data-testid="filters" data-filters={filters.toString()} />
          <button type="button" onClick={add}>
            add
          </button>
          <button type="button" onClick={remove}>
            remove
          </button>
        </div>
      );
    };

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) }));
    const { getByText, getByTestId } = render(
      <FiltersProvider>
        <Hook />
      </FiltersProvider>
    );
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // add filter
    fireEvent.click(getByText('add'));
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(getByTestId('filters').dataset.filters).toEqual(
      new Map().set(FilterKey.name, 'search').toString()
    );

    // add same filter again
    fireEvent.click(getByText('add'));
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(getByTestId('filters').dataset.filters).toEqual(
      new Map().set(FilterKey.name, 'search').toString()
    );

    // remove setted filter
    fireEvent.click(getByText('remove'));
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(getByTestId('filters').dataset.filters).toEqual(new Map().toString());

    // remove not setted filter
    fireEvent.click(getByText('remove'));
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(getByTestId('filters').dataset.filters).toEqual(new Map().toString());
  });
});
