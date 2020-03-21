import { useState, useEffect, useMemo, useCallback } from 'react';
import { IGame, IAPIResponse, IAsset } from './types';

type FilterValues = number[];
type FilterFunction = (value: number) => void;
type SearchFunction = (name: string) => void;
type FilterBoolFunction = (value: boolean) => void;

const order = (a: number, b: number): number => a - b;
const sortByName = (a: IGame, b: IGame): number => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

const SPACE_ID = '9sxha2f3gm24';
const API_TOKEN = '7LDIC95TsrYOfZwEQnbAuMHtij97kfk5r1dIRiGqT8M';
// For local testing replace BASE_URI with
// const BASE_URI = 'http://localhost:3001/response.json';
const BASE_URI = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${API_TOKEN}`;

const useGames = (): [
  IGame[],
  FilterValues,
  FilterFunction,
  FilterValues,
  FilterFunction,
  SearchFunction,
  boolean | undefined,
  FilterBoolFunction
] => {
  const [games, setGames] = useState<IGame[]>([]);

  const [filterByPlayersFromValue, setFilterByPlayersFromValue] = useState<number | undefined>();
  const [filterByPlayersToValue, setFilterByPlayersToValue] = useState<number | undefined>();
  const [filterByFavoriteValue, setFilterByFavoriteValue] = useState<boolean | undefined>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const mapResultsToGames = (results: IAPIResponse): IGame[] => {
    const findImageForGame = (assets: IAsset[], id: string): string => {
      return assets.find(asset => asset.sys.id === id)?.fields.file.url || '';
    };
    return results.items
      .map(item => {
        const {
          age,
          description,
          duration,
          name,
          playersFrom,
          playersTo,
          favorite,
          simpleRules,
          image: imageRef,
        } = item.fields;
        const gameItem: IGame = {
          age,
          description,
          duration,
          name,
          playersFrom,
          playersTo,
          favorite,
          simpleRules,
          image: '',
        };
        if (imageRef && results.includes?.Asset) {
          const image: string = findImageForGame(results.includes.Asset, imageRef.sys.id);
          gameItem.image = image;
        }
        return gameItem;
      })
      .sort(sortByName);
  };

  const loadGames = useCallback(async (url: string): Promise<void> => {
    try {
      const response = await fetch(url);
      const data: IAPIResponse = await response.json();
      const gamesFromAPI: IGame[] = mapResultsToGames(data);
      setGames(gamesFromAPI);
    } catch {
      setGames([]);
    }
  }, []);

  useEffect(() => {
    loadGames(BASE_URI);
  }, [loadGames]);

  const performSearch = (
    from: number | undefined,
    to: number | undefined,
    term: string | undefined,
    favorite: boolean | undefined
  ): void => {
    let url = `${BASE_URI}&content_type=game`;
    if (from) {
      url += `&fields.playersFrom[lte]=${from}`; // &fields.playersTo[gte]=${from}`;
    }
    if (to) {
      url += `&fields.playersTo[gte]=${to}`; // &fields.playersFrom[lte]=${to}`;
    }
    if (term) {
      url += `&fields.name[match]=${term}`;
    }
    if (favorite) {
      url += `&fields.favorite=${favorite}`;
    }
    loadGames(url);
  };

  const playersFromValues: number[] = useMemo(() => {
    return games
      .map(game => game.playersFrom)
      .filter((players, index, array) => array.indexOf(players) === index)
      .sort(order);
  }, [games]);

  const playersToValues: number[] = useMemo(() => {
    return games
      .map(game => game.playersTo)
      .filter((players, index, array) => array.indexOf(players) === index)
      .sort(order);
  }, [games]);

  const filterByPlayersFrom = (value: number): void => {
    if (value) {
      setFilterByPlayersFromValue(value);
      performSearch(value, filterByPlayersToValue, searchTerm, filterByFavoriteValue);
    } else {
      setFilterByPlayersFromValue(undefined);
      performSearch(undefined, filterByPlayersToValue, searchTerm, filterByFavoriteValue);
    }
  };

  const filterByPlayersTo = (value: number): void => {
    if (value) {
      setFilterByPlayersToValue(value);
      performSearch(filterByPlayersFromValue, value, searchTerm, filterByFavoriteValue);
    } else {
      setFilterByPlayersToValue(undefined);
      performSearch(filterByPlayersFromValue, undefined, searchTerm, filterByFavoriteValue);
    }
  };

  const searchForName = (term: string): void => {
    if (term?.length > 1) {
      const lowerTerm = term.toLowerCase();
      setSearchTerm(lowerTerm);
      performSearch(
        filterByPlayersFromValue,
        filterByPlayersToValue,
        lowerTerm,
        filterByFavoriteValue
      );
    } else {
      setSearchTerm(undefined);
      performSearch(
        filterByPlayersFromValue,
        filterByPlayersToValue,
        undefined,
        filterByFavoriteValue
      );
    }
  };

  const filterByFavorite = (value: boolean): void => {
    if (value === true) {
      setFilterByFavoriteValue(value);
      performSearch(filterByPlayersFromValue, filterByPlayersToValue, searchTerm, value);
    } else {
      setFilterByFavoriteValue(undefined);
      performSearch(filterByPlayersFromValue, filterByPlayersToValue, searchTerm, undefined);
    }
  };

  return [
    games,
    playersFromValues,
    filterByPlayersFrom,
    playersToValues,
    filterByPlayersTo,
    searchForName,
    filterByFavoriteValue,
    filterByFavorite,
  ];
};

export default useGames;
