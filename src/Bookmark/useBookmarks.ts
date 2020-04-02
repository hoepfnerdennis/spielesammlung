import { useState, useEffect } from 'react';

const useBookmarks = (): {
  bookmarks: string[];
  mark: (id: string) => void;
} => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setBookmarks(storedBookmarks.split(','));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', bookmarks.join(','));
  }, [bookmarks]);

  const mark = (id: string): void => {
    setBookmarks((_bookmarks) => {
      if (bookmarks.includes(id)) {
        const index = _bookmarks.indexOf(id);
        const newBookmarks = [..._bookmarks];
        newBookmarks.splice(index, 1);
        return newBookmarks;
      }
      const newBookmarks = [..._bookmarks];
      newBookmarks.push(id);
      return newBookmarks;
    });
  };

  return { bookmarks, mark };
};

export default useBookmarks;
