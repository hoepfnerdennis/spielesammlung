import { useState, useEffect, useMemo } from 'react';
import { IGame, IAPIResponse, IAsset } from './types';

type FilterValues = number[];
type FilterFunction = (value: number) => void;

const order = (a: number, b: number): number => a - b;

const SPACE_ID = '9sxha2f3gm24';
const API_TOKEN = '7LDIC95TsrYOfZwEQnbAuMHtij97kfk5r1dIRiGqT8M';
// For local testing replace URI with
// const URI = 'http://localhost:3001/response.json';
const URI = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${API_TOKEN}`;

const useGames = (): [IGame[], FilterValues, FilterValues, FilterFunction, FilterFunction] => {
  const [allGames, setAllGames] = useState<IGame[]>([]);
  const [games, setGames] = useState<IGame[]>([]);

  const [filterByPlayersFromValue, setFilterByPlayersFromValue] = useState<number | undefined>();
  const [filterByPlayersToValue, setFilterByPlayersToValue] = useState<number | undefined>();

  useEffect(() => {
    const findImageForGame = (assets: IAsset[], id: string): string => {
      return assets.find(asset => asset.sys.id === id)?.fields.file.url || '';
    };

    const loadGames = async (): Promise<void> => {
      try {
        const response = await fetch(URI);
        const data: IAPIResponse = await response.json();
        const gamesFromAPI: IGame[] = data.items.map(item => {
          const {
            age,
            description,
            duration,
            name,
            playersFrom,
            playersTo,
            image: imageRef,
          } = item.fields;
          const gameItem: IGame = {
            age,
            description,
            duration,
            name,
            playersFrom,
            playersTo,
            image: '',
          };
          if (imageRef && data.includes?.Asset) {
            const image: string = findImageForGame(data.includes.Asset, imageRef.sys.id);
            gameItem.image = image;
          }
          return gameItem;
        });
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
