import React, { createContext, useReducer } from 'react';
import { IState, Reducer, IAction } from './types';

export const FETCH_DATA_FINISHED = 'FETCH_DATA_FINISHED';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_PALYER_FROM = 'SET_PALYER_FROM';
export const SET_PLAYER_TO = 'SET_PLAYER_TO';
export const SET_FAVORITE = 'SET_FAVORITE';

const initialState: IState = {
  games: [],
  filters: {
    playersFrom: undefined,
    playersTo: undefined,
    favorite: undefined,
    search: undefined,
  },
};

export const Store = createContext<IState | any>(initialState);

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case FETCH_DATA_FINISHED:
      return { ...state, games: action.payload };

    case SET_PALYER_FROM:
      return { ...state, filters: { ...state.filters, playersFrom: action.payload } };

    case SET_PLAYER_TO:
      return { ...state, filters: { ...state.filters, playersTo: action.payload } };

    case SET_SEARCH_TERM:
      return { ...state, filters: { ...state.filters, search: action.payload } };

    case SET_FAVORITE:
      return { ...state, filters: { ...state.filters, favorite: action.payload } };

    default:
      return state;
  }
};

export const StoreProvider: React.SFC = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
};
