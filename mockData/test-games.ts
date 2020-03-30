import { IGame } from '../src/Store/types';

const gameTemplate: IGame = {
  age: 'age',
  description: 'description',
  duration: 'duration',
  favorite: false,
  id: 'id',
  image: 'image',
  name: 'name',
  playersFrom: 2,
  playersTo: 4,
  simpleRules: false,
  drinkingGame: false,
};

const getGame = (props?: any): IGame => ({
  ...gameTemplate,
  ...props,
});

export default getGame;
