import React, { memo, createRef } from 'react';
import styles from './styles.module.css';
import { IGame } from '../Store/types';
import useIntersection from './intersection';
import Features from '../Features';

const Entry: React.SFC<IGame> = ({
  name,
  description,
  playersFrom,
  playersTo,
  age,
  duration,
  favorite,
  simpleRules,
  image,
}): JSX.Element => {
  const entryRef = createRef<HTMLDivElement>();
  const [intersecting] = useIntersection(entryRef, true, { rootMargin: '100px' });
  return (
    <div className={styles.border} ref={entryRef}>
      <div className={`${styles.container} ${favorite ? styles.fav : ''}`}>
        <div className={styles.imageContainer}>
          {intersecting && <img src={image} alt={`Bild von ${name}`} className={styles.image} />}
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <Features
            playersFrom={playersFrom}
            playersTo={playersTo}
            age={age}
            duration={duration}
            simpleRules={simpleRules}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Entry);
