import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from './index';

describe('Checkbox', () => {
  it.each([
    ['checked', true],
    ['unchecked', false],
  ])('should render %s', (_, checked) => {
    const onChange = jest.fn();
    const { container } = render(<Checkbox label="label" onChange={onChange} checked={checked} />);
    expect(container).toMatchSnapshot();
  });

  it('should handle click', () => {
    const onChange = jest.fn();
    const { getByText } = render(<Checkbox label="label" onChange={onChange} checked={false} />);
    fireEvent.click(getByText('label'));
    expect(onChange).toHaveBeenLastCalledWith(true);
  });
});
