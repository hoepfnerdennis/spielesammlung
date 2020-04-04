import makeStore from '../utils/makeStore';
import { IGame } from './types';

interface IAction {
  type: string;
  payload: IGame[];
}

export enum ActionTypes {
  'SET_GAMES' = 'SET_GAMES',
}

const initialState: IGame[] = [];

const dataReducer = (state: IGame[], action: IAction): IGame[] => {
  switch (action.type) {
    case ActionTypes.SET_GAMES:
      return action.payload;
    default:
      return state;
  }
};

const [GamesProvider, useGames, useDispatch] = makeStore<IGame[], IAction>(
  dataReducer,
  initialState
);

export { GamesProvider, useGames, useDispatch };
