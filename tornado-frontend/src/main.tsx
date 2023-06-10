import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RootWidget } from './widgets/layout/RootWidget';
import { System } from './System';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#application'));
  const system = new System();
  root.render(<RootWidget system={system} />);
});
