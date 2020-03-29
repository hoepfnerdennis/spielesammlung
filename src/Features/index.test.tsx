import React from 'react';
import { render } from '@testing-library/react';
import Feature from './index';

describe('Features', () => {
  it.each([
    [
      'default',
      {
        icon: 'icon',
        name: 'name',
        desc: 'desc',
      },
    ],
    [
      'with condition',
      {
        icon: 'icon',
        name: 'name',
        desc: 'desc',
        condition: false,
      },
    ],
  ])('should render item %s', (_, props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { container } = render(<Feature.Item {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('should render list', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const { container } = render(
      <Feature.List>
        <Feature.Item name="name1" icon="icon1" desc="desc1" />
        <Feature.Item name="name2" icon="icon2" desc="desc2" condition={false} />
      </Feature.List>
    );
    expect(container).toMatchSnapshot();
  });
});
