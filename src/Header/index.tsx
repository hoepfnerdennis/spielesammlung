import React, { memo } from 'react';
import styles from './styles.module.css';
import Search from '../Search';

const Header: React.SFC = (): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.caption}>Spielesammlung</h1>
        <p className={styles.description}>
          Wir listen hier all unsere Spiele auf - zum Teilen, Ausleihen oder gemeinsam Spielen
        </p>
        <Search />
      </div>
    </header>
  );
};

export default memo(Header);
