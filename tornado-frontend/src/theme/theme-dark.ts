import { TornadoTheme } from './theme';
import { ButtonType } from '../widgets/forms/ButtonWidget';

export const ThemeDark: TornadoTheme = {
  layout: {
    background: '#18181b',
    separatorLine: '#2d2d2f',
    centerPanel: '#121215'
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
