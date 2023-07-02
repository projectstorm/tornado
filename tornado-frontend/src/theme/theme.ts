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
  light: boolean;
  layout: {
    background: string;
    separatorLine: string;
    centerPanel: string;
  };
  editor: {
    background: string;
    stripes: string;
    selected: string;
    selectedShadow: string;
  };
  table: {
    row: {
      background: string;
      backgroundHover: string;
    };
  };
  dialog: {
    background: string;
    header: string;
    desc: string;
    shadow: string;
    border: string;
  };
  text: {
    heading: string;
    description: string;
  };
  controls: {
    error: string;
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
