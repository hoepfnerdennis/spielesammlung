import React, { useState, useContext } from 'react';
import styles from './styles.module.css';
import { setSearchTerm } from '../Store/action';
import { Store } from '../Store';

const Search: React.FC = (): JSX.Element => {
  const [searchTerm, setSearchTermInternal] = useState<string>('');
  const { dispatch } = useContext(Store);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSearchTerm(dispatch)(searchTerm);
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
