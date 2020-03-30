import { IGame, IAPIResponse, IAsset } from '../Store/types';

export const order = (a: number, b: number): number => a - b;

export const sortByName = (a: IGame, b: IGame): number => {
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

export const mapResultsToGames = (results: IAPIResponse): IGame[] => {
  const findImageForGame = (assets: IAsset[], id: string): string => {
    return assets.find((asset) => asset.sys.id === id)?.fields.file.url || '';
  };
  return results.items
    .map((item) => {
      const {
        age,
        description,
        duration,
        name,
        playersFrom,
        playersTo,
        favorite = false,
        simpleRules = false,
        image: imageRef,
        drinkingGame = false,
      } = item.fields;
      const { id } = item.sys;
      const gameItem: IGame = {
        id,
        age,
        description,
        duration,
        name,
        playersFrom,
        playersTo,
        favorite,
        simpleRules,
        image: '',
        drinkingGame,
      };
      if (imageRef && results.includes?.Asset) {
        const image: string = findImageForGame(results.includes.Asset, imageRef.sys.id);
        gameItem.image = image;
      }
      return gameItem;
    })
    .sort(sortByName);
};

export const chunkArray = <T>(array: Array<T>, size: number): Array<Array<T>> => {
  const arrayLength = array.length;
  const tempArray = [];

  for (let index = 0; index < arrayLength; index += size) {
    const myChunk = array.slice(index, index + size);
    tempArray.push(myChunk);
  }

  return tempArray;
};
