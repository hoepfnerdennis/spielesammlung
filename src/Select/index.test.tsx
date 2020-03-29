import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './index';

describe('Select', () => {
  it('should render and match snapshot', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Select
        onChange={onChange}
        label="label"
        value="a"
        values={['a', 'b', 'c']}
        valueSuffix="valueSuffix"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should handle change', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Select
        onChange={onChange}
        label="label"
        value="a"
        values={['a', 'b', 'c']}
        valueSuffix="valueSuffix"
      />
    );
    fireEvent.change(getByLabelText('label'), { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalledWith('b');
    fireEvent.change(getByLabelText('label'), { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('should not rerender if values not change', () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      <Select
        onChange={onChange}
        label="label"
        value="a"
        values={['a', 'b', 'c']}
        valueSuffix="valueSuffix"
      />
    );
    expect(container).toMatchSnapshot();
    rerender(
      <Select
        onChange={onChange}
        label="label new"
        value="a"
        values={['a', 'b', 'c']}
        valueSuffix="valueSuffix"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
