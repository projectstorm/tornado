import './publicPath';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RootWidget } from './widgets/layout/RootWidget';
import { System } from './System';
import './fonts';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
  disableErrorBoundaries: false
});

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#application'));
  const system = new System();
  root.render(<RootWidget system={system} />);
});
