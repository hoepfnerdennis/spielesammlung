import { useState, useEffect, useMemo } from 'react';
import { EntryProps } from '../Entry/types';

const order = (a: string, b: string): number => parseInt(a, 10) - parseInt(b, 10);

const useGames = () => {
  const [allGames, setAllGames] = useState<Array<EntryProps>>([]);
  const [games, setGames] = useState<Array<EntryProps>>([]);

  const [filterByPlayersFromValue, setFilterByPlayersFromValue] = useState<string | undefined>();
  const [filterByPlayersToValue, setFilterByPlayersToValue] = useState<string | undefined>();

  useEffect(() => {
    import(/* webpackChunkName: "games" */ './games.json').then(({ default: data }) => {
      setAllGames(data);
      setGames(data);
    });
  }, []);

  const playersFromValues = useMemo(() => {
    return allGames
      .map(game => game.players.from)
      .filter((players, index, array) => array.indexOf(players) === index)
      .sort(order);
  }, [allGames]);

  const playersToValues = useMemo(() => {
    return allGames
      .map(game => game.players.to)
      .filter((players, index, array) => array.indexOf(players) === index)
      .sort(order);
  }, [allGames]);

  useEffect(() => {
    let filteredGames = allGames;
    if (filterByPlayersFromValue) {
      filteredGames = filteredGames.filter(game => game.players.from === filterByPlayersFromValue);
    }
    if (filterByPlayersToValue) {
      filteredGames = filteredGames.filter(game => game.players.to === filterByPlayersToValue);
    }
    setGames(filteredGames);
  }, [allGames, filterByPlayersFromValue, filterByPlayersToValue]);

  const filterByPlayersFrom = (value: string): void => {
    if (value) {
      setFilterByPlayersFromValue(value);
    } else {
      setFilterByPlayersFromValue(undefined);
    }
  };

  const filterByPlayersTo = (value: string): void => {
    if (value) {
      setFilterByPlayersToValue(value);
    } else {
      setFilterByPlayersToValue(undefined);
    }
  };

  return { games, playersFromValues, playersToValues, filterByPlayersFrom, filterByPlayersTo };
};

export default useGames;
