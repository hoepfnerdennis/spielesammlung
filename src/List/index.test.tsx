import React from 'react';
import { render } from '@testing-library/react';
import List from './index';
import getGame from '../../mockData/test-games';
import ContextWrapper from '../test-utils/ContextWrapper';
import { useGames } from '../Store/GamesStore';

jest.mock('../Store/GamesStore');

describe('List', () => {
  it('should render and match snapshot', () => {
    const games = [getGame()];
    // @ts-ignore
    useGames.mockImplementation(() => games);
    const { container } = render(
      <ContextWrapper>
        <List />
      </ContextWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
