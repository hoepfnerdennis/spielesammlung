import React from 'react';
import styles from './styles.module.css';
import Entry from './Entry';
import useGames from './handler';
import Select from './Select';
import Search from './Search';
import Checkbox from './Checkbox';

const List: React.FC = (): JSX.Element => {
  const [
    games,
    playersFromValues,
    filterByPlayersFrom,
    playersToValues,
    filterByPlayersTo,
    searchForName,
    filterByFavoriteValue,
    filterByFavorite,
  ] = useGames();

  return (
    <>
      <div className={styles.filters}>
        <span>{games.length} Spiele</span>
        <div className={styles.element}>
          <Search onSearch={searchForName} />
        </div>
        <div className={styles.element}>
          <Select
            values={playersFromValues}
            onChange={filterByPlayersFrom}
            label="ab"
            valueSuffix="Spieler"
          />
          <Select
            values={playersToValues}
            onChange={filterByPlayersTo}
            label="bis"
            valueSuffix="Spieler"
          />
        </div>
        <div className={styles.element}>
          <Checkbox
            checked={filterByFavoriteValue || false}
            label="Nur Empfehlungen"
            onChange={filterByFavorite}
          />
        </div>
      </div>
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
        }) => (
          <Entry
            key={name}
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
        )
      )}
    </>
  );
};

export default List;
