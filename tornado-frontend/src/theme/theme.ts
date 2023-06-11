import { CreateStyled } from './emotion';
import { default as s2 } from '@emotion/styled';
import { ButtonType } from '../widgets/forms/ButtonWidget';

export interface BtnTheme {
  background: string;
  color: string;
  backgroundHover: string;
  colorHover: string;
}

export interface TornadoTheme {
  layout: {
    background: string;
    separatorLine: string;
  };
  controls: {
    button: {
      [key in ButtonType]: BtnTheme;
    };
    field: {
      background: string;
      color: string;
      placeholder: string;
    };
  };
}

export const styled = s2 as CreateStyled<TornadoTheme>;
