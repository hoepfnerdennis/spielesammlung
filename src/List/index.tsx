import React from 'react';
import styles from './styles.module.css';
import Entry from '../Entry';
import useGames from './handler';
import Select from '../Select';

const List: React.FC = (): JSX.Element => {
  const {
    games,
    playersFromValues,
    playersToValues,
    filterByPlayersFrom,
    filterByPlayersTo,
  } = useGames();
  return (
    <>
      <div className={styles.filters}>
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
      {games.map(({ age, description, duration, name, players }) => (
        <Entry
          key={name}
          age={age}
          description={description}
          duration={duration}
          name={name}
          players={players}
        />
      ))}
    </>
  );
};

export default List;
