import { createContext } from 'react';
import { IGame, SetFilterFunc, ActiveFiltersMap } from './types';

const defaultValue = {
  games: [],
  setFilter: () => (): void => {
    // default
  },
  activeFilters: new Map(),
};

export default createContext<{
  games: IGame[];
  setFilter: SetFilterFunc;
  activeFilters: ActiveFiltersMap;
}>(defaultValue);
