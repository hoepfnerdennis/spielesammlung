import React, { useContext, useMemo, useState } from 'react';
import styles from './styles.module.css';
import Select from '../Select';
import Checkbox from '../Checkbox';
import { Store } from '../Store';
import { IState, Dispatch } from '../Store/types';
import { order } from '../utils';
import { setPlayersFrom, setPlayersTo, setFavorite } from '../Store/action';
import Layer from '../Layer';

const Filters: React.FC = (): JSX.Element => {
  const [displayFilterLayer, setDisplayFilterLayer] = useState<boolean>(false);
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

  if (displayFilterLayer) {
    return (
      <Layer closeLayer={(): void => setDisplayFilterLayer(false)}>
        <h2 className={styles.headline}>Filtere die Spiele</h2>
        <div className={styles.element}>
          <Select
            values={playersFromValues}
            onChange={setPlayersFrom(dispatch)}
            label="Nur Spiele ab"
            valueSuffix="Spieler"
          />
        </div>
        <div className={styles.element}>
          <Select
            values={playersToValues}
            onChange={setPlayersTo(dispatch)}
            label="Nur Spiele bis"
            valueSuffix="Spieler"
          />
        </div>
        <div className={styles.element}>
          <Checkbox
            checked={filters.favorite || false}
            label={filters.favorite ? 'Alle Spiele anzeigen' : 'Nur Empfehlungen anzeigen'}
            onChange={setFavorite(dispatch)}
          />
        </div>
      </Layer>
    );
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={(): void => setDisplayFilterLayer(true)}>
      Filter anzeigen
    </button>
  );
};

export default Filters;
