import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Marker from '../Marker';
import { useBookmarks, useMark } from '../../Store/BookmarkStore';
import ContextWrapper from '../../test-utils/ContextWrapper';

jest.mock('../../Store/BookmarkStore', () => ({
  useBookmarks: jest.fn(),
  useMark: jest.fn(),
}));

describe('Marker', () => {
  it.each([
    ['active', ['a', 'b', 'c'], 'a'],
    ['inactive', ['a', 'b', 'c'], 'd'],
  ])('should render %s', (desc, bookmarks, id) => {
    const mark = jest.fn();
    // @ts-ignore
    useBookmarks.mockImplementation(() => bookmarks);
    // @ts-ignore
    useMark.mockImplementation(() => mark);

    const { container, getByTestId } = render(
      <ContextWrapper>
        <Marker id={id} />
      </ContextWrapper>
    );

    fireEvent.click(getByTestId('bookmark-toggle'));
    expect(mark).toHaveBeenCalledWith(id);
    expect(mark).toHaveBeenCalledTimes(1);

    expect(container).toMatchSnapshot();
  });
});
