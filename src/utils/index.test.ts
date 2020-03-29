import { chunkArray, mapResultsToGames, order, sortByName } from './index';
import data from '../../mockData/test-data.json';
import getGame from '../../mockData/test-games';

describe('utils', () => {
  describe('chunkArray', () => {
    it('should split array', () => {
      const input: number[] = [1, 2, 3, 4, 5];
      const output = chunkArray<number>(input, 3);
      expect(output).toHaveLength(2);
      expect(output[0]).toEqual([1, 2, 3]);
      expect(output[1]).toEqual([4, 5]);
    });
  });
  describe('order', () => {
    it('should return order', () => {
      expect(order(3, 2)).toEqual(1);
    });
  });
  describe('mapResultsToGames', () => {
    it('should map to products', () => {
      // @ts-ignore
      const output = mapResultsToGames(data);
      expect(output).toMatchSnapshot();
    });
  });
  describe('sortByName', () => {
    it.each([
      ['asc', getGame({ name: 'a' }), getGame({ name: 'b' }), -1],
      ['desc', getGame({ name: 'b' }), getGame({ name: 'a' }), 1],
      ['equal', getGame({ name: 'a' }), getGame({ name: 'a' }), 0],
    ])('sort %s', (_, game1, game2, result) => {
      expect(sortByName(game1, game2)).toBe(result);
    });
  });
});
