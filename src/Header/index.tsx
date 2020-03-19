import React from 'react';
import styles from './styles.module.css';

const Header: React.SFC = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.caption}>Spielesammlung</h1>
        <p>Wir listen hier all unsere Spiele auf - zum Teilen, Ausleihen oder gemeinsam Spielen</p>
      </div>
    </header>
  );
};

export default Header;
