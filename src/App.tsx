import React from 'react';
import styles from './App.module.css';
import Header from './Header';
import List from './List';
import Footer from './Footer';
import useData from './Store/action';
import DataContext from './Store/DataContext';
import BookmarkContext from './Bookmark/BookmarkContext';
import useBookmarks from './Bookmark/useBookmarks';

const App: React.FC = () => {
  const { games, setFilter, activeFilters } = useData();
  const { bookmarks, mark } = useBookmarks();

  return (
    <DataContext.Provider value={{ games, setFilter, activeFilters }}>
      <BookmarkContext.Provider value={{ bookmarks, mark }}>
        <div className={styles.container}>
          <Header />
          <main>
            <List />
          </main>
          <Footer />
        </div>
      </BookmarkContext.Provider>
    </DataContext.Provider>
  );
};

export default App;
