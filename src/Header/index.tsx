import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import Search from '../Search';

const Header: React.SFC = (): JSX.Element => {
  const history = useHistory();

  const navigateToHome = (): void => {
    history.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button type="button" className={styles.button} onClick={navigateToHome}>
          <h1 className={styles.caption}>Spielesammlung</h1>
          <p className={styles.description}>
            Wir listen hier all unsere Spiele auf - zum Teilen, Ausleihen oder gemeinsam Spielen
          </p>
        </button>
        <Search />
      </div>
    </header>
  );
};

export default memo(Header);
