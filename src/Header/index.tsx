import React, { memo } from 'react';
import styles from './styles.module.css';
import Search from '../Search';
import { SetFilterFunc } from '../Store/types';

const Header: React.SFC<{ setFilter: SetFilterFunc }> = ({ setFilter }): JSX.Element => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.caption}>Spielesammlung</h1>
        <p className={styles.description}>
          Wir listen hier all unsere Spiele auf - zum Teilen, Ausleihen oder gemeinsam Spielen
        </p>
        <Search setFilter={setFilter} />
      </div>
    </header>
  );
};

export default memo(Header);
