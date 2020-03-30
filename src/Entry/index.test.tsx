import React from 'react';
import { render } from '@testing-library/react';
import Entry from './index';
import useIntersection from './intersection';
import getGame from '../../mockData/test-games';

jest.mock('../Features/index.tsx', () => ({
  List: ({ children }) => children,
  Item: ({ name, condition }) => <div data-condition={condition}>{name}</div>,
}));
jest.mock('./intersection.ts');

describe('Entry', () => {
  it.each([
    ['with intersection', true, getGame()],
    ['with favorite', true, getGame({ favorite: true })],
    ['with same players', true, getGame({ playersFrom: 2, playersTo: 2 })],
    ['default', false, getGame()],
  ])('should render %s', (_, intersecting, game) => {
    // @ts-ignore
    useIntersection.mockImplementation(() => intersecting);
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { container } = render(<Entry {...game} />);
    expect(container).toMatchSnapshot();
  });
  it('should handle conditions correct', () => {
    // @ts-ignore
    useIntersection.mockImplementation(() => true);
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { getByText } = render(<Entry {...getGame({ drinkingGame: true, simpleRules: true })} />);
    expect(getByText('Trinkspiel').dataset.condition).toBe('true');
    expect(getByText('Einfache Regeln').dataset.condition).toBe('true');
  });
});
