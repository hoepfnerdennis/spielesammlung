import React, { useState, useContext } from 'react';
import styles from './styles.module.css';
import { FilterKey } from '../Store/types';
import Button from '../ Button';
import DataContext from '../Store/DataContext';

const Search: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTermInternal] = useState<string>('');
  const { setFilter } = useContext(DataContext);

  const doSearch = (): void => {
    setFilter(FilterKey.name)(searchTerm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    doSearch();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTermInternal(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={styles.input}
        placeholder="Spiel suchen..."
      />
      <Button data-testid="submit" onClick={doSearch} secondary>
        Suchen
      </Button>
    </form>
  );
};

export default Search;
