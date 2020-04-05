import { renderHook } from '@testing-library/react-hooks';
import useLocalStorage from '../useLocalStoreage';

describe('useLocalStorage', () => {
  it('should add and get item', () => {
    const { result } = renderHook(() => useLocalStorage());
    result.current.setItem('key', { value: 'value' });
    expect(result.current.getItem('key')).toMatchInlineSnapshot(`
      Object {
        "value": "value",
      }
    `);
  });

  it('should return fallback', () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.getItem('not defined')).toBeUndefined();
  });
});
