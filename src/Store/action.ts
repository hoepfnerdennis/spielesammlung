import { useCallback, useState, useEffect } from 'react';
import {
  IGame,
  IAPIResponse,
  FiltersConfig,
  FilterKey,
  FilterValue,
  SetFilterFunc,
  ActiveFiltersMap,
} from './types';
import { mapResultsToGames } from '../utils';

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
};

const fetchGamesAction = async (filters: Map<FilterKey, FilterValue>): Promise<IGame[]> => {
  let url = `${BASE_URI}&content_type=game`;
  filters.forEach((value, key) => {
    url += `&fields.${FilterKey[key]}${filtersConfig[FilterKey[key]]}=${value}`; // &fields.playersTo[gte]=${from}`;
  });

  try {
    const response = await fetch(url);
    const data: IAPIResponse = await response.json();
    const gamesFromAPI: IGame[] = mapResultsToGames(data);
    return gamesFromAPI;
  } catch {
    return [];
  }
};

const useData = (): {
  games: IGame[];
  setFilter: SetFilterFunc;
  activeFilters: ActiveFiltersMap;
} => {
  const [games, setGames] = useState<IGame[]>([]);
  const [activeFilters, setActiveFilters] = useState<ActiveFiltersMap>(new Map());

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const newGames = await fetchGamesAction(activeFilters);
      setGames(newGames);
    };
    fetchGames();
  }, [activeFilters]);

  const addFilter = useCallback((key: FilterKey, value: FilterValue): void => {
    setActiveFilters(activeFiltersMap => {
      if (activeFiltersMap.get(key) === value) {
        return activeFiltersMap;
      }
      const newMap = new Map(activeFiltersMap);
      newMap.set(key, value);
      return newMap;
    });
  }, []);

  const removeFilter = useCallback((key: FilterKey): void => {
    setActiveFilters(activeFiltersMap => {
      if (!activeFiltersMap.has(key)) {
        return activeFiltersMap;
      }
      const newMap = new Map(activeFiltersMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const setFilter = useCallback(
    (key: FilterKey) => (value: FilterValue | undefined): void => {
      if (value) {
        addFilter(key, value);
      } else {
        removeFilter(key);
      }
    },
    [addFilter, removeFilter]
  );

  return { games, setFilter, activeFilters };
};

export default useData;
