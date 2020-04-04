import React from 'react';
import ReactDOM from 'react-dom';
import { createRenderer } from 'fela';
import { RendererProvider } from 'react-fela';
import App from './App';
import { register } from './serviceWorker';

const renderer = createRenderer();

ReactDOM.render(
  <RendererProvider renderer={renderer}>
    <App />
  </RendererProvider>,
  document.getElementById('root')
);

register();
