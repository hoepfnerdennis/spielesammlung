import React from 'react';
import { render } from '@testing-library/react';
import Layer from './index';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/no-explicit-any
  createPortal: (children: any) => <div data-testid="portal">{children}</div>,
}));

describe('Layer', () => {
  it('should render and match snapshot', () => {
    const layerRoot = document.createElement('div');
    layerRoot.setAttribute('id', 'layer');
    const { container } = render(<Layer closeLayer={jest.fn()}>children</Layer>, {
      container: layerRoot,
    });
    expect(container).toMatchSnapshot();
  });
});
