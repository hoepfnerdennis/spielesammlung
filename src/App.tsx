import React from 'react';
import styles from './App.module.css';
import Header from './Header';
import List from './List';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <List />
      </main>
      <Footer />
    </div>
  );
};

export default App;
