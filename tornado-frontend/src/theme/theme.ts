import { CreateStyled } from './emotion';
import { default as s2 } from '@emotion/styled';

export interface TornadoTheme {
  layout: {
    background: string;
    separatorLine: string;
  };
}

export const styled = s2 as CreateStyled<TornadoTheme>;
