import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RootWidget } from './widgets/layout/RootWidget';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.querySelector('#application'));

  root.render(<RootWidget />);
});
