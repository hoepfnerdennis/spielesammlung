import React, { useContext } from 'react';
import BookmarkContext from './BookmarkContext';
import Button from '../ Button';

const Marker: React.FC<{ id: string }> = ({ id }) => {
  const { bookmarks, mark } = useContext(BookmarkContext);
  return (
    <Button secondary={bookmarks.includes(id)} onClick={(): void => mark(id)}>
      {bookmarks.includes(id) ? 'gemerkt!' : 'Merken'}
    </Button>
  );
};

export default Marker;
