import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from './index';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
jest.mock('../Button', () => ({ secondary, onClick, children }) => (
  <button type="button" data-checked={secondary} onClick={onClick}>
    {children}
  </button>
));

describe('Checkbox', () => {
  it.each([
    ['checked', true, undefined],
    ['unchecked', false, 'true'],
  ])('should render %s', (_, checked, result) => {
    const onChange = jest.fn();
    const { container, getByText } = render(
      <Checkbox label="label" onChange={onChange} checked={checked} />
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(getByText('label'));
    expect(onChange).toHaveBeenLastCalledWith(result);
  });
});
