import React from 'react';
import ReactDOM from 'react-dom';
import { createRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import App from './App';
import { register } from './serviceWorker';
import { GamesProvider } from './Store/GamesStore';
import { FiltersProvider } from './Store/FiltersStore';
import { BookmarksProvider } from './Store/BookmarkStore';

const renderer = createRenderer();

ReactDOM.render(
  <RendererProvider renderer={renderer}>
    <GamesProvider>
      <FiltersProvider>
        <BookmarksProvider>
          <App />
        </BookmarksProvider>
      </FiltersProvider>
    </GamesProvider>
  </RendererProvider>,
  document.getElementById('root')
);

register();
