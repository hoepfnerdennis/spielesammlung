import React from 'react';
import styles from './styles.module.css';
import Entry from '../Entry';
import useGames from './handler';
import Select from '../Select';
import Search from '../Search';

const List: React.FC = (): JSX.Element => {
  const [
    games,
    playersFromValues,
    filterByPlayersFrom,
    playersToValues,
    filterByPlayersTo,
    searchForName,
  ] = useGames();

  return (
    <>
      <div className={styles.filters}>
        <span>{games.length} Spiele</span>
        <Search onSearch={searchForName} />
        <div>
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
      </div>
      {games.map(({ age, description, duration, name, playersFrom, playersTo, image }) => (
        <Entry
          key={name}
          age={age}
          description={description}
          duration={duration}
          name={name}
          playersFrom={playersFrom}
          playersTo={playersTo}
          image={image}
        />
      ))}
    </>
  );
};

export default List;
