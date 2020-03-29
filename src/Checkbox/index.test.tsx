import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from './index';

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
