import React from 'react';
import styles from './styles.module.css';

const Features: React.SFC<{
  playersFrom: number;
  playersTo: number;
  age: string;
  duration: string;
  simpleRules: boolean;
}> = ({ playersFrom, playersTo, age, duration, simpleRules }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className={styles.players}>
          <span role="img" aria-label="Anzahl Spieler">
            👤
          </span>
          <b className={styles.highlight}>
            {playersFrom === playersTo ? playersFrom : `${playersFrom} - ${playersTo}`} Spieler
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
      {simpleRules && (
        <div>
          <p className={styles.players}>
            <span role="img" aria-label="Einfache Regeln">
              🏋️‍♀️
            </span>
            <b className={styles.highlight}>einfach</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default Features;
