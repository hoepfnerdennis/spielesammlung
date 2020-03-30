import React, { memo, createRef, useEffect } from 'react';
import styles from './styles.module.css';
import { IGame } from '../Store/types';
import useIntersection from './intersection';
import Feature from '../Features';

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
  drinkingGame,
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

  const player = playersFrom === playersTo ? playersFrom : `${playersFrom} - ${playersTo}`;

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
            <Feature.List>
              <Feature.Item name="Anzahl Spieler" icon="👤" desc={`${player} Spieler`} />
              <Feature.Item name="Altersempfehlung" icon="📅" desc={`ab ${age} Jahren`} />
              <Feature.Item name="Spieldauer" icon="⏳" desc={duration} />
              <Feature.Item
                condition={simpleRules}
                name="Einfache Regeln"
                icon="🏋️‍♀️"
                desc="einfach"
              />
              <Feature.Item
                condition={drinkingGame}
                name="Trinkspiel"
                icon="🥂"
                desc="Trinkspiel"
              />
            </Feature.List>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Entry);
