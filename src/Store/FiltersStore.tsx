import makeStore from '../utils/makeStore';
import { ActiveFiltersMap } from './types';

interface IAction {
  type: string;
  payload: ActiveFiltersMap;
}

export enum ActionTypes {
  'SET_FILTER' = 'SET_FILTER',
}

const initialState: ActiveFiltersMap = new Map();

const dataReducer = (state: ActiveFiltersMap, action: IAction): ActiveFiltersMap => {
  switch (action.type) {
    case ActionTypes.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

const [FiltersProvider, useFilters, useDispatch] = makeStore<ActiveFiltersMap, IAction>(
  dataReducer,
  initialState
);

export { FiltersProvider, useFilters, useDispatch };
