import { TornadoTheme } from './theme';
import { ButtonType } from '../widgets/forms/ButtonWidget';

export const ThemeLight: TornadoTheme = {
  light: true,
  layout: {
    background: '#dcdcdc',
    separatorLine: '#c4c4c4',
    centerPanel: '#d2d2d2'
  },
  dialog: {
    background: '#131315',
    border: '#000',
    header: '#fff',
    desc: '#5f5f60',
    shadow: 'rgba(0,0,0,0.3)'
  },
  text: {
    heading: '#000000',
    description: '#545454'
  },
  table: {
    row: {
      background: 'transparent',
      backgroundHover: '#c7c7c7'
    }
  },
  editor: {
    background: '#dcdcdc',
    stripes: '#d0d0d0',
    selected: '#ff0026',
    selectedShadow: 'rgba(255,0,0,0.49)'
  },
  controls: {
    error: '#ab3838',
    field: {
      background: '#c4c4c4',
      color: '#000000',
      placeholder: '#616162'
    },
    button: {
      [ButtonType.NORMAL]: {
        background: '#b9b9c4',
        backgroundHover: '#ababb2',
        color: '#ffffff',
        colorHover: '#ffffff'
      },
      [ButtonType.PRIMARY]: {
        background: '#79bed3',
        backgroundHover: '#00c1ff',
        color: '#ffffff',
        colorHover: '#ffffff'
      }
    }
  }
};
