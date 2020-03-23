import { IGame, IAPIResponse, IFilters, Dispatch } from './types';
import { SET_GAMES, SET_SEARCH_TERM, SET_PALYER_FROM, SET_PLAYER_TO, SET_FAVORITE } from '.';
import { mapResultsToGames } from '../utils';

const SPACE_ID = '9sxha2f3gm24';
const API_TOKEN = '7LDIC95TsrYOfZwEQnbAuMHtij97kfk5r1dIRiGqT8M';
// For local testing replace BASE_URI with
// const BASE_URI = 'http://localhost:3001/response.json';
const BASE_URI = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${API_TOKEN}`;

// eslint-disable-next-line import/prefer-default-export
export const fetchGamesAction = async (filters: IFilters, dispatch: Dispatch): Promise<void> => {
  let url = `${BASE_URI}&content_type=game`;
  if (filters.playersFrom) {
    url += `&fields.playersFrom[lte]=${filters.playersFrom}`; // &fields.playersTo[gte]=${from}`;
  }
  if (filters.playersTo) {
    url += `&fields.playersTo[gte]=${filters.playersTo}`; // &fields.playersFrom[lte]=${to}`;
  }
  if (filters.search) {
    url += `&fields.name[match]=${filters.search}`;
  }
  if (filters.favorite) {
    url += `&fields.favorite=${filters.favorite}`;
  }
  try {
    const response = await fetch(url);
    const data: IAPIResponse = await response.json();
    const gamesFromAPI: IGame[] = mapResultsToGames(data);
    dispatch({
      type: SET_GAMES,
      payload: gamesFromAPI,
    });
  } catch {
    dispatch({
      type: SET_GAMES,
      payload: [],
    });
  }
};

export const setSearchTerm = (dispatch: Dispatch): ((payload: string) => void) => (
  payload: string
): void => {
  dispatch({ type: SET_SEARCH_TERM, payload });
};

export const setPlayersFrom = (dispatch: Dispatch): ((payload: number) => void) => (
  payload: number
): void => {
  dispatch({ type: SET_PALYER_FROM, payload });
};

export const setPlayersTo = (dispatch: Dispatch): ((payload: number) => void) => (
  payload: number
): void => {
  dispatch({ type: SET_PLAYER_TO, payload });
};

export const setFavorite = (dispatch: Dispatch): ((payload: boolean) => void) => (
  payload: boolean
): void => {
  dispatch({ type: SET_FAVORITE, payload });
};
