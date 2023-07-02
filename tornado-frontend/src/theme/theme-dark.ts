import { TornadoTheme } from './theme';
import { ButtonType } from '../widgets/forms/ButtonWidget';

export const ThemeDark: TornadoTheme = {
  layout: {
    background: '#18181b',
    separatorLine: '#2d2d2f',
    centerPanel: '#121215'
  },
  dialog: {
    background: '#131315',
    border: '#000',
    header: '#fff',
    desc: '#5f5f60',
    shadow: 'rgba(0,0,0,0.3)'
  },
  text: {
    heading: '#fff',
    description: '#5f5f60'
  },
  table: {
    row: {
      background: 'transparent',
      backgroundHover: '#212123'
    }
  },
  editor: {
    background: '#18181b',
    stripes: '#202021'
  },
  controls: {
    error: '#ab3838',
    field: {
      background: '#18181b',
      color: '#ffffff',
      placeholder: '#616162'
    },
    button: {
      [ButtonType.NORMAL]: {
        background: '#212123',
        backgroundHover: '#38383c',
        color: '#ffffff',
        colorHover: '#ffffff'
      },
      [ButtonType.PRIMARY]: {
        background: '#274a55',
        backgroundHover: '#1983a6',
        color: '#ffffff',
        colorHover: '#ffffff'
      }
    }
  }
};
