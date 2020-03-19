import React from 'react';
import styles from './App.module.css';

import Header from './Header';
import List from './List';

const App: React.SFC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <List />
      </main>
      {/* <footer>footer</footer> */}
    </div>
  );
};

export default App;
