import { useCallback, useEffect } from 'react';
import { IGame, IAPIResponse, FiltersConfig, FilterKey, FilterValue, SetFilterFunc } from './types';
import { mapResultsToGames } from '../utils';
import { useDispatch as useDispatchGames, ActionTypes as GamesActionTypes } from './GamesStore';
import {
  useFilters,
  useDispatch as useDispatchFilters,
  ActionTypes as FiltersActionTypes,
} from './FiltersStore';

const SPACE_ID = '9sxha2f3gm24';
const API_TOKEN = '7LDIC95TsrYOfZwEQnbAuMHtij97kfk5r1dIRiGqT8M';
// For local testing replace BASE_URI with
// const BASE_URI = 'http://localhost:3001/response.json';
const BASE_URI = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${API_TOKEN}`;

const filtersConfig: FiltersConfig = {
  playersFrom: '[lte]',
  playersTo: '[gte]',
  name: '[match]',
  favorite: '',
  simpleRules: '',
  drinkingGame: '',
};

const fetchGames = async (url: string) => {
  try {
    const response = await fetch(url);
    const data: IAPIResponse = await response.json();
    const gamesFromAPI: IGame[] = mapResultsToGames(data);
    return gamesFromAPI;
  } catch {
    return [];
  }
};

const fetchGamesAction = async (filters: Map<FilterKey, FilterValue>): Promise<IGame[]> => {
  let url = `${BASE_URI}&content_type=game`;
  filters.forEach((value, key) => {
    url += `&fields.${FilterKey[key]}${filtersConfig[FilterKey[key]]}=${value}`; // &fields.playersTo[gte]=${from}`;
  });
  return fetchGames(url);
};

export const useSetFilter = (): SetFilterFunc => {
  const dispatch = useDispatchFilters();
  const activeFilters = useFilters();

  const addFilter = useCallback(
    (key: FilterKey, value: FilterValue): void => {
      if (activeFilters.get(key) === value) {
        return;
      }
      const newMap = new Map(activeFilters);
      newMap.set(key, value);
      dispatch({ type: FiltersActionTypes.SET_FILTER, payload: newMap });
    },
    [activeFilters, dispatch]
  );

  const removeFilter = useCallback(
    (key: FilterKey): void => {
      if (!activeFilters.has(key)) {
        return;
      }
      const newMap = new Map(activeFilters);
      newMap.delete(key);
      dispatch({ type: FiltersActionTypes.SET_FILTER, payload: newMap });
    },
    [activeFilters, dispatch]
  );

  const setFilter = useCallback(
    (key: FilterKey) => (value?: FilterValue): void => {
      if (value) {
        addFilter(key, value);
      } else {
        removeFilter(key);
      }
    },
    [addFilter, removeFilter]
  );

  return setFilter;
};

export const useFetchGames = (): void => {
  const dispatch = useDispatchGames();
  const activeFilters = useFilters();
  useEffect(() => {
    const getGames = async (): Promise<void> => {
      const newGames = await fetchGamesAction(activeFilters);
      dispatch({ type: GamesActionTypes.SET_GAMES, payload: newGames });
    };
    getGames();
  }, [activeFilters, dispatch]);
};
