import { useCallback } from 'react';

const useLocalStorage = (): {
  getItem: <T>(key: string) => T | undefined;
  setItem: <T>(key: string, value: T) => void;
} => {
  const getItem = useCallback(<T>(key: string): T | undefined => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return undefined;
  }, []);

  const setItem = useCallback(<T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  return { getItem, setItem };
};

export default useLocalStorage;
