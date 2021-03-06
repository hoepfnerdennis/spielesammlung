import React, { Suspense } from 'react';
import { IGame } from '../Store/types';
import Filters from '../Filters';
import styles from './styles.module.css';
import { useFetchGames } from '../Store/action';
import { useGames } from '../Store/GamesStore';

const Entry = React.lazy(() => import(/* webpackChunkName: "entry" */ '../Entry'));

const List: React.SFC = (): JSX.Element => {
  const games = useGames();

  useFetchGames();

  return (
    <>
      <div className={styles.filterContainer}>
        <span>{games.length} Spiele</span>
        <Filters />
      </div>
      {games.map(
        ({
          id,
          age,
          description,
          duration,
          name,
          playersFrom,
          playersTo,
          favorite,
          simpleRules,
          image,
          drinkingGame,
        }: IGame) => (
          <Suspense fallback={null} key={id}>
            <Entry
              id={id}
              age={age}
              description={description}
              duration={duration}
              name={name}
              playersFrom={playersFrom}
              playersTo={playersTo}
              favorite={favorite}
              simpleRules={simpleRules}
              image={image}
              drinkingGame={drinkingGame}
            />
          </Suspense>
        )
      )}
    </>
  );
};

export default List;
