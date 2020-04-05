import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BookmarksProvider, useBookmarks, useMark } from '../BookmarkStore';
import {
  FiltersProvider,
  useFilters,
  useDispatch as useDispatchFilters,
  ActionTypes,
} from '../FiltersStore';
import { GamesProvider, useGames, useDispatch as useDispatchGames } from '../GamesStore';

describe('Stores', () => {
  describe('BookmarkStore', () => {
    it('should provide store', () => {
      const id = 'id';
      const Hook = (): JSX.Element => {
        const bookmarks = useBookmarks();
        const mark = useMark();
        return (
          <div>
            <button type="button" onClick={(): void => mark(id)}>
              mark
            </button>
            <div>
              {bookmarks.map((b) => (
                <div key={b}>{b}</div>
              ))}
            </div>
          </div>
        );
      };
      const { getByText } = render(
        <BookmarksProvider>
          <Hook />
        </BookmarksProvider>
      );

      fireEvent.click(getByText('mark'));
      fireEvent.click(getByText('mark'));
    });
  });

  describe('FiltersStore', () => {
    it('should provide store', () => {
      const Hook = (): JSX.Element => {
        useFilters();
        const dispatch = useDispatchFilters();
        const setFilter = (): void => {
          dispatch({ type: ActionTypes.SET_FILTER, payload: new Map() });
        };
        return (
          <div>
            <button type="button" onClick={(): void => setFilter()}>
              setFilter
            </button>
          </div>
        );
      };
      const { getByText } = render(
        <FiltersProvider>
          <Hook />
        </FiltersProvider>
      );

      fireEvent.click(getByText('setFilter'));
    });
  });

  describe('GamesStore', () => {
    it('should provide store', () => {
      const Hook = (): JSX.Element => {
        useGames();
        const dispatch = useDispatchGames();
        const setGames = (): void => {
          dispatch({ type: ActionTypes.SET_FILTER, payload: [] });
        };
        return (
          <div>
            <button type="button" onClick={(): void => setGames()}>
              setGames
            </button>
          </div>
        );
      };
      const { getByText } = render(
        <GamesProvider>
          <Hook />
        </GamesProvider>
      );

      fireEvent.click(getByText('setGames'));
    });
  });
});
