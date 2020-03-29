// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook, act } from '@testing-library/react-hooks';
import useData from './action';
import data from '../../mockData/test-data.json';
import { FilterKey } from './types';

describe('useData', () => {
  it('should fetch data', async () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) }));
    const { result, waitForNextUpdate } = renderHook(() => useData());
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitForNextUpdate();
    expect(result.current.games).toHaveLength(6);
  });

  it('should handle error when fetching data', async () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    window.fetch = jest.fn(() => Promise.reject());
    const { result, waitForNextUpdate } = renderHook(() => useData());
    expect(window.fetch).toHaveBeenCalledTimes(1);
    await waitForNextUpdate();
    expect(result.current.games).toEqual([]);
  });

  describe('should set filter', () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(data) }));
    const { result } = renderHook(() => useData());
    expect(window.fetch).toHaveBeenCalledTimes(1);

    // add filter
    act(() => {
      result.current.setFilter(FilterKey.name)('search');
    });
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.activeFilters).toEqual(new Map().set(FilterKey.name, 'search'));

    // add same filter again
    act(() => {
      result.current.setFilter(FilterKey.name)('search');
    });
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(result.current.activeFilters).toEqual(new Map().set(FilterKey.name, 'search'));

    // remove setted filter
    act(() => {
      result.current.setFilter(FilterKey.name)();
    });
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(result.current.activeFilters).toEqual(new Map());

    // remove not setted filter
    act(() => {
      result.current.setFilter(FilterKey.name)();
    });
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(result.current.activeFilters).toEqual(new Map());
  });
});
