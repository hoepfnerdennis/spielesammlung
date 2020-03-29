import { IGame } from '../src/Store/types';

const gameTemplate: IGame = {
  age: 'age',
  description: 'description',
  duration: 'duration',
  favorite: true,
  id: 'id',
  image: 'image',
  name: 'name',
  playersFrom: 2,
  playersTo: 4,
  simpleRules: true,
};

const getGame = (props?: any): IGame => ({
  ...gameTemplate,
  ...props,
});

export default getGame;
