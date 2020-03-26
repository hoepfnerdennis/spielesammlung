import React, { useMemo, useState } from 'react';
import styles from './styles.module.css';
import Select from '../Select';
import Checkbox from '../Checkbox';
import { order } from '../utils';
import Layer from '../Layer';
import { IGame, ActiveFiltersMap, FilterKey, SetFilterFunc } from '../Store/types';

const Filters: React.FC<{
  games: IGame[];
  setFilter: SetFilterFunc;
  activeFilters: ActiveFiltersMap;
}> = ({ games, setFilter, activeFilters }): JSX.Element => {
  const [displayFilterLayer, setDisplayFilterLayer] = useState<boolean>(false);

  const playersFromValues: string[] = useMemo(
    () =>
      games
        .map(game => game.playersFrom)
        .filter((players, index, array) => array.indexOf(players) === index)
        .sort(order)
        .map(f => f.toString()),
    [games]
  );

  const playersToValues: string[] = useMemo(
    () =>
      games
        .map(game => game.playersTo)
        .filter((players, index, array) => array.indexOf(players) === index)
        .sort(order)
        .map(f => f.toString()),
    [games]
  );

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={(): void => setDisplayFilterLayer(true)}>
        Filter anzeigen
      </button>
      {displayFilterLayer && (
        <Layer closeLayer={(): void => setDisplayFilterLayer(false)}>
          <h2 className={styles.headline}>Filtere die Spiele</h2>
          <div className={styles.element}>
            <Select
              values={playersFromValues}
              value={activeFilters.get(FilterKey.playersFrom) || ''}
              onChange={setFilter(FilterKey.playersFrom)}
              label="Nur Spiele ab"
              valueSuffix="Spieler"
            />
          </div>
          <div className={styles.element}>
            <Select
              values={playersToValues}
              value={activeFilters.get(FilterKey.playersTo) || ''}
              onChange={setFilter(FilterKey.playersTo)}
              label="Nur Spiele bis"
              valueSuffix="Spieler"
            />
          </div>
          <div className={styles.element}>
            <Checkbox
              checked={activeFilters.has(FilterKey.favorite)}
              label={
                activeFilters.get(FilterKey.favorite)
                  ? 'Alle Spiele anzeigen'
                  : 'Nur Empfehlungen anzeigen'
              }
              onChange={setFilter(FilterKey.favorite)}
            />
          </div>
        </Layer>
      )}
    </>
  );
};

export default Filters;
