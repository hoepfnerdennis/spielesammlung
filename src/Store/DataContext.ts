import { createContext } from 'react';
import { IGame, SetFilterFunc, ActiveFiltersMap } from './types';

const defaultValue = {
  games: [],
  setFilter: () => (): void => {
    // default
  },
  activeFilters: new Map(),
};

export interface IDataContext {
  games: IGame[];
  setFilter: SetFilterFunc;
  activeFilters: ActiveFiltersMap;
}

export default createContext<IDataContext>(defaultValue);
