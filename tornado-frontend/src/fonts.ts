import '@fontsource/open-sans';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faPlus, faSignOut, faSpinner, faSun } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';

library.add(faPlus, faSpinner, faSignOut, faSun, faMoon);

export const FONT = css`
  font-family: 'Open sans', sans-serif;
`;
