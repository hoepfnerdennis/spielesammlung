import React, { useState } from 'react';
import styles from './styles.module.css';
import { SetFilterFunc, FilterKey } from '../Store/types';

const Search: React.FC<{ setFilter: SetFilterFunc }> = ({ setFilter }): JSX.Element => {
  const [searchTerm, setSearchTermInternal] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFilter(FilterKey.name)(searchTerm);
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
      <input type="submit" value="Suchen" className={styles.submit} />
    </form>
  );
};

export default Search;
