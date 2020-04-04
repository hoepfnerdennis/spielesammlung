import { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';
import DataContext from './DataContext';
import { FilterKey } from './types';

describe('DataContext', () => {
  it('should provide default data props', () => {
    const { result } = renderHook(() => useContext(DataContext));
    expect(result.current.games).toEqual([]);
    expect(result.current.activeFilters).toEqual(new Map());
    expect(() => {
      result.current.setFilter(FilterKey.name)();
    }).not.toThrow();
  });
});
