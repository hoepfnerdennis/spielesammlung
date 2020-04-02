import { createContext } from 'react';

const defaultValue = {
  bookmarks: [],
  mark: (): void => {
    // default
  },
};

export default createContext<{ bookmarks: string[]; mark: (id: string) => void }>(defaultValue);
