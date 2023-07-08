import '@fontsource/open-sans';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCrop,
  faExpand,
  faLock,
  faLockOpen,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faMinimize,
  faMoon,
  faPlus,
  faSignOut,
  faSpinner,
  faSun,
  faTrash,
  faUpRightAndDownLeftFromCenter
} from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';

library.add(
  faPlus,
  faSpinner,
  faSignOut,
  faSun,
  faMoon,
  faCrop,
  faTrash,
  faExpand,
  faMinimize,
  faUpRightAndDownLeftFromCenter,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faLock,
  faLockOpen
);

export const FONT = css`
  font-family: 'Open sans', sans-serif;
`;
