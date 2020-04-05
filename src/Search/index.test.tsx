import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './index';
import { FilterKey } from '../Store/types';
import ContextWrapper from '../test-utils/ContextWrapper';
import { useSetFilter } from '../Store/action';

jest.mock('../Store/action');

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
jest.mock('../Button', () => ({ secondary, onClick, children }) => (
  <button type="button" data-checked={secondary} onClick={onClick}>
    {children}
  </button>
));

describe('Search', () => {
  it('should render and match snapshot', () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });
  it('should handle input', () => {
    const setSearchTerm = jest.fn();
    const setFilter = jest.fn(() => setSearchTerm);
    // @ts-ignore
    useSetFilter.mockImplementation(() => setFilter);
    const { getByPlaceholderText, getByText } = render(
      <ContextWrapper>
        <Search />
      </ContextWrapper>
    );
    fireEvent.change(getByPlaceholderText('Spiel suchen...'), { target: { value: 'abc' } });
    fireEvent.submit(getByText('Suchen'));
    expect(setFilter).toHaveBeenCalledWith(FilterKey.name);
    expect(setSearchTerm).toHaveBeenCalledWith('abc');
  });
});
