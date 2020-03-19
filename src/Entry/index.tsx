import React, { memo } from 'react';
import styles from './styles.module.css';
import { EntryProps } from './types';

const src =
  'https://images.unsplash.com/photo-1582921017967-79d1cb6702ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=50';

const Entry: React.SFC<EntryProps> = ({
  name,
  description,
  players,
  age,
  duration,
}): JSX.Element => {
  return (
    <div className={styles.border}>
      <div className={styles.container}>
        <img src={src} alt="img" className={styles.image} />
        <div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <p className={styles.players}>
            <span role="img" aria-label="Anzahl Spieler">
              👤
            </span>
            <b className={styles.highlight}>
              {players.from === players.to ? players.from : `${players.from} - ${players.to}`}
            </b>
          </p>
          <p className={styles.players}>
            <span role="img" aria-label="Altersempfehlung">
              📅
            </span>
            <b className={styles.highlight}>{age}</b>
          </p>
          <p className={styles.players}>
            <span role="img" aria-label="Spieldauer">
              ⏳
            </span>
            <b className={styles.highlight}>{duration}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(Entry);
