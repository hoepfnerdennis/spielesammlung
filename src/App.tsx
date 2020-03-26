import React from 'react';
import styles from './App.module.css';
import Header from './Header';
import List from './List';
import Footer from './Footer';
import useData from './Store/action';

const App: React.FC = () => {
  const { games, setFilter, activeFilters } = useData();
  return (
    <div className={styles.container}>
      <Header setFilter={setFilter} />
      <main>
        <List games={games} setFilter={setFilter} activeFilters={activeFilters} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
