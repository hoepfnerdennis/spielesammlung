import React from 'react';
import { useFela } from 'react-fela';
import { IStyle } from 'fela';
import { useBookmarks, useMark } from '../Store/BookmarkStore';

const invisibleButton: IStyle = {
  fontSize: '1.6rem',
  appearance: 'none',
  border: 'none',
  background: 'transparent',
};

const Marker: React.FC<{ id: string }> = ({ id }) => {
  const bookmarks = useBookmarks();
  const mark = useMark();
  const { css } = useFela();
  return (
    <button
      data-testid="bookmark-toggle"
      type="button"
      onClick={(): void => mark(id)}
      className={css(invisibleButton)}>
      {bookmarks.includes(id) ? '❤️' : '🤍'}
    </button>
  );
};

export default Marker;
