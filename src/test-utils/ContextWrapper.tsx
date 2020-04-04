import React from 'react';
import { createRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import DataContext from '../Store/DataContext';

const renderer = createRenderer();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContextWrapper: React.FC<any> = ({
  children,
  games = [],
  activeFilters = new Map(),
  setFilter = () => (): void => {
    // default
  },
}) => {
  return (
    <DataContext.Provider value={{ games, activeFilters, setFilter }}>
      <RendererProvider renderer={renderer}>{children}</RendererProvider>
    </DataContext.Provider>
  );
};

export default ContextWrapper;
