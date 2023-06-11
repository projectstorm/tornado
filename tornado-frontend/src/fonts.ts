import '@fontsource/open-sans';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faSignOut, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';

library.add(faPlus, faSpinner, faSignOut);

export const FONT = css`
  font-family: 'Open sans', sans-serif;
`;
