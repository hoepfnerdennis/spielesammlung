import React from 'react';
import { render } from '@testing-library/react';
import List from './index';
import getGame from '../../mockData/test-games';
import ContextWrapper from '../test-utils/ContextWrapper';

describe('List', () => {
  it('should render and match snapshot', () => {
    const games = [getGame()];
    const { container } = render(
      <ContextWrapper games={games}>
        <List />
      </ContextWrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
