import React, { createRef } from 'react';
import { render, act } from '@testing-library/react';
import useIntersection from './intersection';

const MockComponent: React.SFC<{ once?: boolean }> = ({ once }) => {
  const ref = createRef<HTMLDivElement>();
  const isIntersecting = useIntersection(ref, once);
  return (
    <div ref={ref} data-testid="ref">
      {isIntersecting ? 'intersecting' : 'notIntersecting'}
    </div>
  );
};

describe('intersection', () => {
  const storedIntersectionObserver = window.IntersectionObserver;

  const mockObserver = {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };

  beforeEach(() => {
    mockObserver.disconnect.mockClear();
    mockObserver.observe.mockClear();
    mockObserver.unobserve.mockClear();
  });

  afterAll(() => {
    window.IntersectionObserver = storedIntersectionObserver;
  });

  it('should intersect and trigger once', () => {
    let callback: any;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.IntersectionObserver = jest.fn(function IntersectionObserver(observerCallback) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.observe = mockObserver.observe;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.disconnect = mockObserver.disconnect;
      callback = observerCallback;
    });

    const { getByTestId } = render(<MockComponent once />);

    expect(getByTestId('ref').innerHTML).toMatchInlineSnapshot(`"notIntersecting"`);
    expect(mockObserver.observe).toHaveBeenCalledTimes(1);
    expect(mockObserver.disconnect).toHaveBeenCalledTimes(0);
    expect(mockObserver.unobserve).toHaveBeenCalledTimes(0);

    const entry = { isIntersecting: true };
    act(() => callback([entry], { unobserve: mockObserver.unobserve }));

    expect(getByTestId('ref').innerHTML).toMatchInlineSnapshot(`"intersecting"`);
    expect(mockObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(mockObserver.unobserve).toHaveBeenCalledTimes(1);
  });

  it('should intersect multiple times', () => {
    let callback: any;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.IntersectionObserver = jest.fn(function IntersectionObserver(observerCallback) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.observe = mockObserver.observe;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.disconnect = mockObserver.disconnect;
      callback = observerCallback;
    });

    const { getByTestId } = render(<MockComponent />);

    expect(getByTestId('ref').innerHTML).toMatchInlineSnapshot(`"notIntersecting"`);
    expect(mockObserver.observe).toHaveBeenCalledTimes(1);
    expect(mockObserver.disconnect).toHaveBeenCalledTimes(0);
    expect(mockObserver.unobserve).toHaveBeenCalledTimes(0);

    const entry = { isIntersecting: true };
    act(() => callback([entry], { unobserve: mockObserver.unobserve }));

    expect(getByTestId('ref').innerHTML).toMatchInlineSnapshot(`"intersecting"`);
    expect(mockObserver.unobserve).toHaveBeenCalledTimes(0);

    entry.isIntersecting = false;
    act(() => callback([entry], { unobserve: mockObserver.unobserve }));

    expect(getByTestId('ref').innerHTML).toMatchInlineSnapshot(`"notIntersecting"`);
    expect(mockObserver.unobserve).toHaveBeenCalledTimes(0);
  });

  it('should handle fallback if no intersection observer available', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.IntersectionObserver = undefined;

    const { getByTestId } = render(<MockComponent />);

    expect(getByTestId('ref').innerHTML).toMatchInlineSnapshot(`"intersecting"`);
    expect(mockObserver.observe).toHaveBeenCalledTimes(0);
    expect(mockObserver.disconnect).toHaveBeenCalledTimes(0);
    expect(mockObserver.unobserve).toHaveBeenCalledTimes(0);
  });
});
