import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './index';
import { FilterKey } from '../Store/types';

describe('Search', () => {
  it('should render and match snapshot', () => {
    const { container } = render(<Search setFilter={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
  it('should handle input', () => {
    const setSearchTerm = jest.fn();
    const setFilter = jest.fn(() => setSearchTerm);
    const { getByPlaceholderText, getByTestId } = render(<Search setFilter={setFilter} />);
    fireEvent.change(getByPlaceholderText('Spiel suchen...'), { target: { value: 'abc' } });
    fireEvent.submit(getByTestId('submit'));
    expect(setFilter).toHaveBeenCalledWith(FilterKey.name);
    expect(setSearchTerm).toHaveBeenCalledWith('abc');
  });
});
