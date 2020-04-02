import React, { Suspense, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { IGame } from '../Store/types';
import Filters from '../Filters';
import styles from './styles.module.css';
import Button from '../ Button';
import DataContext from '../Store/DataContext';
import BookmarkContext from '../Bookmark/BookmarkContext';

const Entry = React.lazy(() => import(/* webpackChunkName: "entry" */ '../Entry'));

const List: React.SFC = (): JSX.Element => {
  const history = useHistory();
  const { games } = useContext(DataContext);
  const { bookmarks } = useContext(BookmarkContext);

  const navigateToBookmarks = (): void => {
    history.push('/bookmarks');
  };

  return (
    <>
      <div className={styles.filterContainer}>
        <span>{games.length} Spiele</span>
        <Button onClick={navigateToBookmarks}>Merkliste ({bookmarks.length})</Button>
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
