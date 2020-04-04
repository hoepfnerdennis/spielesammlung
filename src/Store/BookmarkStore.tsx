import { useEffect } from 'react';
import makeStore from '../utils/makeStore';
import useLocalStorage from '../utils/useLocalStoreage';

interface IAction {
  type: string;
  payload: any;
}

export enum ActionTypes {
  'SET_BOOKMARKS' = 'SET_BOOKMARKS',
  'ADD_BOOKMARK' = 'ADD_BOOKMARK',
  'REMOVE_BOOKMARK' = 'REMOVE_BOOKMARK',
}

const initialState: string[] = localStorage.getItem('bookmarks')?.split(',') || [];

const dataReducer = (state: string[], action: IAction): string[] => {
  switch (action.type) {
    case ActionTypes.SET_BOOKMARKS:
      return action.payload;
    case ActionTypes.ADD_BOOKMARK:
      return [...state, action.payload];
    case ActionTypes.REMOVE_BOOKMARK:
      return state.filter((value) => value !== action.payload);
    default:
      return state;
  }
};

const [BookmarksProvider, useBookmarks, useDispatch] = makeStore<string[], IAction>(
  dataReducer,
  initialState
);

const useMark = (): ((id: string) => void) => {
  const dispatch = useDispatch();
  const bookmarks = useBookmarks();
  const { setItem } = useLocalStorage();

  const mark = (id: string): void => {
    if (bookmarks.includes(id)) {
      return dispatch({ type: ActionTypes.REMOVE_BOOKMARK, payload: id });
    }
    return dispatch({ type: ActionTypes.ADD_BOOKMARK, payload: id });
  };

  useEffect(() => {
    setItem<string[]>('bookmarks', bookmarks);
  }, [bookmarks, setItem]);

  return mark;
};

export { BookmarksProvider, useBookmarks, useMark };
