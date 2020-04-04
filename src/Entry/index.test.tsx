/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { render } from '@testing-library/react';
import Entry from './index';
import useIntersection from './intersection';
import getGame from '../../mockData/test-games';
import ContextWrapper from '../test-utils/ContextWrapper';

jest.mock('../Features/index.tsx', () => ({
  List: ({ children }) => children,
  Item: ({ name, condition }) => <div data-condition={condition}>{name}</div>,
}));
jest.mock('./intersection.ts');
jest.mock('../Bookmark/Marker', () => () => 'Marker');

describe('Entry', () => {
  it.each([
    ['with intersection', true, getGame()],
    ['with favorite', true, getGame({ favorite: true })],
    ['with same players', true, getGame({ playersFrom: 2, playersTo: 2 })],
    ['default', false, getGame()],
  ])('should render %s', (_, intersecting, game) => {
    // @ts-ignore
    useIntersection.mockImplementation(() => intersecting);
    const { container } = render(
      <ContextWrapper>
        <Entry {...game} />
      </ContextWrapper>
    );
    expect(container).toMatchSnapshot();
  });
  it('should handle conditions correct', () => {
    // @ts-ignore
    useIntersection.mockImplementation(() => true);
    const { getByText } = render(
      <ContextWrapper>
        <Entry {...getGame({ drinkingGame: true, simpleRules: true })} />
      </ContextWrapper>
    );
    expect(getByText('Trinkspiel').dataset.condition).toBe('true');
    expect(getByText('Einfache Regeln').dataset.condition).toBe('true');
  });
  it('should not rerender when id not changes', () => {
    // @ts-ignore
    useIntersection.mockImplementation(() => true);
    const { container, rerender } = render(
      <ContextWrapper>
        <Entry {...getGame()} />
      </ContextWrapper>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <ContextWrapper>
        <Entry {...getGame()} />
      </ContextWrapper>
    );

    expect(container).toMatchSnapshot();
  });
});
