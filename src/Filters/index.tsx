import React, { useMemo, useState } from 'react';
import styles from './styles.module.css';
import Select from '../Select';
import Checkbox from '../Checkbox';
import { order } from '../utils';
import Layer from '../Layer';
import { FilterKey } from '../Store/types';
import Button from '../Button';
import { useGames } from '../Store/GamesStore';
import { useFilters } from '../Store/FiltersStore';
import { useSetFilter } from '../Store/action';

const Filters: React.FC = (): JSX.Element => {
  const [displayFilterLayer, setDisplayFilterLayer] = useState<boolean>(false);

  const games = useGames();
  const activeFilters = useFilters();
  const setFilter = useSetFilter();

  const playersFromValues: string[] = useMemo(
    () =>
      games
        .map((game) => game.playersFrom)
        .filter((players, index, array) => array.indexOf(players) === index)
        .sort(order)
        .map((f) => f.toString()),
    [games]
  );

  const playersToValues: string[] = useMemo(
    () =>
      games
        .map((game) => game.playersTo)
        .filter((players, index, array) => array.indexOf(players) === index)
        .sort(order)
        .map((f) => f.toString()),
    [games]
  );

  return (
    <>
      <Button onClick={(): void => setDisplayFilterLayer(true)}>Filter anzeigen</Button>
      {displayFilterLayer && (
        <Layer closeLayer={(): void => setDisplayFilterLayer(false)}>
          <h2 className={styles.headline}>Filtere die Spiele</h2>
          <div className={styles.element}>
            <Select
              values={playersFromValues}
              value={activeFilters.get(FilterKey.playersFrom) || ''}
              onChange={setFilter(FilterKey.playersFrom)}
              label="👤 Nur Spiele ab"
              valueSuffix="Spieler"
            />
          </div>
          <div className={styles.element}>
            <Select
              values={playersToValues}
              value={activeFilters.get(FilterKey.playersTo) || ''}
              onChange={setFilter(FilterKey.playersTo)}
              label="👤 Nur Spiele bis"
              valueSuffix="Spieler"
            />
          </div>
          <div className={styles.element}>
            <Checkbox
              checked={activeFilters.has(FilterKey.favorite)}
              label="👍 Nur Empfehlungen anzeigen"
              onChange={setFilter(FilterKey.favorite)}
            />
          </div>
          <div className={styles.element}>
            <Checkbox
              checked={activeFilters.has(FilterKey.simpleRules)}
              label="🏋️‍♀️ einfache Spielregeln"
              onChange={setFilter(FilterKey.simpleRules)}
            />
          </div>
          <div className={styles.element}>
            <Checkbox
              checked={activeFilters.has(FilterKey.drinkingGame)}
              label="🥂 Trinkspiel geeignet"
              onChange={setFilter(FilterKey.drinkingGame)}
            />
          </div>
        </Layer>
      )}
    </>
  );
};

export default Filters;
