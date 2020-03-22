import React from 'react';
import styles from './App.module.css';

import Header from './Header';
import List from './List';
import { StoreProvider } from './Store';
import Footer from './Footer';

const App: React.SFC = () => {
  return (
    <StoreProvider>
      <div className={styles.container}>
        <Header />
        <main>
          <List />
        </main>
        <Footer />
      </div>
    </StoreProvider>
  );
};

export default App;
