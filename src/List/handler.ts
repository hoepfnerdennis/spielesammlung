import { useState, useEffect, useMemo } from 'react';
import { IGame, IAPIResponse } from './types';

type FilterValues = number[];
type FilterFunction = (value: number) => void;

const order = (a: number, b: number): number => a - b;

const SPACE_ID = '9sxha2f3gm24';
const API_TOKEN = '7LDIC95TsrYOfZwEQnbAuMHtij97kfk5r1dIRiGqT8M';
const URI = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${API_TOKEN}`;

const useGames = (): [IGame[], FilterValues, FilterValues, FilterFunction, FilterFunction] => {
  const [allGames, setAllGames] = useState<IGame[]>([]);
  const [games, setGames] = useState<IGame[]>([]);

  const [filterByPlayersFromValue, setFilterByPlayersFromValue] = useState<number | undefined>();
  const [filterByPlayersToValue, setFilterByPlayersToValue] = useState<number | undefined>();

  useEffect(() => {
    const loadGames = async (): Promise<void> => {
      try {
        const response = await fetch(URI);
        const data: IAPIResponse = await response.json();
        const gamesFromAPI: IGame[] = data.items.map(item => item.fields);
        setAllGames(gamesFromAPI);
        setGames(gamesFromAPI);
      } catch {
        setAllGames([]);
        setGames([]);
      }
    };
    loadGames();
  }, []);

  const playersFromValues: number[] = useMemo(() => {
    return allGames
      .map(game => game.playersFrom)
      .filter((players, index, array) => array.indexOf(players) === index)
      .sort(order);
  }, [allGames]);

  const playersToValues: number[] = useMemo(() => {
    return allGames
      .map(game => game.playersTo)
      .filter((players, index, array) => array.indexOf(players) === index)
      .sort(order);
  }, [allGames]);

  useEffect(() => {
    let filteredGames = allGames;
    if (filterByPlayersFromValue) {
      filteredGames = filteredGames.filter(game => game.playersFrom === filterByPlayersFromValue);
    }
    if (filterByPlayersToValue) {
      filteredGames = filteredGames.filter(game => game.playersTo === filterByPlayersToValue);
    }
    setGames(filteredGames);
  }, [allGames, filterByPlayersFromValue, filterByPlayersToValue]);

  const filterByPlayersFrom = (value: number): void => {
    if (value) {
      setFilterByPlayersFromValue(value);
    } else {
      setFilterByPlayersFromValue(undefined);
    }
  };

  const filterByPlayersTo = (value: number): void => {
    if (value) {
      setFilterByPlayersToValue(value);
    } else {
      setFilterByPlayersToValue(undefined);
    }
  };

  return [games, playersFromValues, playersToValues, filterByPlayersFrom, filterByPlayersTo];
};

export default useGames;
