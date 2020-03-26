import React, { memo, createRef, useEffect } from 'react';
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
  const intersecting = useIntersection(entryRef, true);
  const intersectingWithMargin = useIntersection(entryRef, true, { rootMargin: '200px' });

  useEffect(() => {
    if (intersectingWithMargin) {
      const loadImage = new Image();
      loadImage.src = image;
    }
  }, [intersectingWithMargin, image]);

  return (
    <div className={styles.border} ref={entryRef}>
      {intersecting && (
        <div className={`${styles.container} ${favorite ? styles.fav : ''}`}>
          <div className={styles.imageContainer}>
            <img src={image} alt={`Bild von ${name}`} className={styles.image} />
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
      )}
    </div>
  );
};

export default memo(Entry);
