import React, { FunctionComponent } from 'react';
import { createRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

const renderer = createRenderer();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContextWrapper: FunctionComponent = ({ children }) => {
  return <RendererProvider renderer={renderer}>{children}</RendererProvider>;
};

export default ContextWrapper;
