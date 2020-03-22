import { IGame, IAPIResponse, IAsset } from './Store/types';

export const order = (a: number, b: number): number => a - b;

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

export const mapResultsToGames = (results: IAPIResponse): IGame[] => {
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
