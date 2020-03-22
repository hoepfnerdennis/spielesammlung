import React, { useContext, useMemo } from 'react';
import styles from './styles.module.css';
import Select from '../Select';
import Search from '../Search';
import Checkbox from '../Checkbox';
import { Store } from '../Store';
import { IState, Dispatch } from '../Store/types';
import { order } from '../utils';
import { setSearchTerm, setPlayersFrom, setPlayersTo, setFavorite } from '../Store/action';

const Filters: React.FC = (): JSX.Element => {
  const {
    state: { games, filters },
    dispatch,
  }: { state: IState; dispatch: Dispatch } = useContext(Store);

  const playersFromValues: number[] = useMemo(
    () =>
      games
        .map(game => game.playersFrom)
        .filter((players, index, array) => array.indexOf(players) === index)
        .sort(order),
    [games]
  );

  const playersToValues: number[] = useMemo(
    () =>
      games
        .map(game => game.playersTo)
        .filter((players, index, array) => array.indexOf(players) === index)
        .sort(order),
    [games]
  );

  return (
    <div className={styles.filters}>
      <span>{games.length} Spiele</span>
      <div className={styles.element}>
        <Search onSearch={setSearchTerm(dispatch)} />
      </div>
      <div className={styles.element}>
        <Select
          values={playersFromValues}
          onChange={setPlayersFrom(dispatch)}
          label="ab"
          valueSuffix="Spieler"
        />
        <Select
          values={playersToValues}
          onChange={setPlayersTo(dispatch)}
          label="bis"
          valueSuffix="Spieler"
        />
      </div>
      <div className={styles.element}>
        <Checkbox
          checked={filters.favorite || false}
          label="Nur Empfehlungen"
          onChange={setFavorite(dispatch)}
        />
      </div>
    </div>
  );
};

export default Filters;
