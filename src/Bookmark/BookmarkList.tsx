import React, { useContext, Suspense } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { IGame } from '../Store/types';
import DataContext from '../Store/DataContext';
import Button from '../ Button';
import BookmarkContext from './BookmarkContext';

const Entry = React.lazy(() => import(/* webpackChunkName: "entry" */ '../Entry'));

const BookmarkList: React.FC<RouteComponentProps<{ ids?: string; title?: string }>> = ({
  match,
}): JSX.Element => {
  const { bookmarks: myBookmarks } = useContext(BookmarkContext);
  const bookmarksFromUrl = match.params.ids?.split(',');
  const bookmarks = bookmarksFromUrl || myBookmarks;
  const { games } = useContext(DataContext);
  const history = useHistory();

  const navigateToHome = (): void => {
    history.push('/');
  };

  return (
    <div>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '.6rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}>
        <span>{bookmarks.length} Spiele</span>
        <h2 style={{ margin: '0', color: 'darkcyan' }}>{match.params.title || 'Merkliste'}</h2>
        <Share bookmarks={bookmarks} />
        <Button onClick={navigateToHome}>Zurück zur Startseite</Button>
      </div>
      {games
        .filter((game) => bookmarks.includes(game.id))
        .map(
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
    </div>
  );
};

export default BookmarkList;
