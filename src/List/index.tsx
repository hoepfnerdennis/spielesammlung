import React, { useContext, useEffect, Suspense } from 'react';
import { fetchGamesAction } from '../Store/action';
import { Store } from '../Store';
import { IGame, IState, Dispatch } from '../Store/types';
import Filters from '../Filters';

const Entry = React.lazy(() => import(/* webpackChunkName: "entry" */ '../Entry'));

const List: React.FC = (): JSX.Element => {
  const {
    state: { games, filters },
    dispatch,
  }: { state: IState; dispatch: Dispatch } = useContext(Store);

  useEffect(() => {
    fetchGamesAction(filters, dispatch);
  }, [dispatch, filters]);

  return (
    <>
      <Filters />
      {games.map(
        ({
          age,
          description,
          duration,
          name,
          playersFrom,
          playersTo,
          favorite,
          simpleRules,
          image,
        }: IGame) => (
          <Suspense fallback={null} key={name}>
            <Entry
              age={age}
              description={description}
              duration={duration}
              name={name}
              playersFrom={playersFrom}
              playersTo={playersTo}
              favorite={favorite}
              simpleRules={simpleRules}
              image={image}
            />
          </Suspense>
        )
      )}
    </>
  );
};

export default List;
