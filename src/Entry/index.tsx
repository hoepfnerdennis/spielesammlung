import React, { memo } from 'react';
import styles from './styles.module.css';
import { IGame } from '../List/types';

const Entry: React.SFC<IGame> = ({
  name,
  description,
  playersFrom,
  playersTo,
  age,
  duration,
  image,
}): JSX.Element => {
  return (
    <div className={styles.border}>
      <div className={styles.container}>
        <img src={image} alt={`Bild von ${name}`} className={styles.image} />
        <div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <p className={styles.players}>
            <span role="img" aria-label="Anzahl Spieler">
              👤
            </span>
            <b className={styles.highlight}>
              {playersFrom === playersTo ? playersFrom : `${playersFrom} - ${playersTo}`}
            </b>
          </p>
          <p className={styles.players}>
            <span role="img" aria-label="Altersempfehlung">
              📅
            </span>
            <b className={styles.highlight}>ab {age} Jahren</b>
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
