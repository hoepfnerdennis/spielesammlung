import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../index';
import ContextWrapper from '../../test-utils/ContextWrapper';

describe('Button', () => {
  it.each([
    ['default', false],
    ['secondary', true],
  ])('should render %s', (desc, secondary) => {
    const { container } = render(
      <ContextWrapper>
        <Button onClick={jest.fn()} secondary={secondary}>
          Button
        </Button>
      </ContextWrapper>
    );
    expect(container).toMatchSnapshot();
  });
  it('should handle onClikc', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <ContextWrapper>
        <Button onClick={onClick}>Button</Button>
      </ContextWrapper>
    );
    fireEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
