import '@fontsource/open-sans';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCrop,
  faExpand,
  faMinimize,
  faMoon,
  faPlus,
  faSignOut,
  faSpinner,
  faSun,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';

library.add(faPlus, faSpinner, faSignOut, faSun, faMoon, faCrop, faTrash, faExpand, faMinimize);

export const FONT = css`
  font-family: 'Open sans', sans-serif;
`;
