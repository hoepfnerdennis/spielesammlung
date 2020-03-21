import React, { useState } from 'react';
import styles from './styles.module.css';

const Search: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={styles.input}
        placeholder="Suche nach..."
      />
      <input type="submit" value="Suchen" className={styles.submit} />
    </form>
  );
};

export default Search;
