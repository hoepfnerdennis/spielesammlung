import React, { useContext } from 'react';
import { useFela } from 'react-fela';
import { IStyle } from 'fela';
import BookmarkContext from './BookmarkContext';

const invisibleButton: IStyle = {
  fontSize: '1.6rem',
  appearance: 'none',
  border: 'none',
  background: 'transparent',
};

const Marker: React.FC<{ id: string }> = ({ id }) => {
  const { bookmarks, mark } = useContext(BookmarkContext);
  const { css } = useFela();
  return (
    <button type="button" onClick={(): void => mark(id)} className={css(invisibleButton)}>
      {bookmarks.includes(id) ? '❤️' : '🤍'}
    </button>
  );
};

export default Marker;
