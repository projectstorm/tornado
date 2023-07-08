import { UserStore } from './stores/UserStore';
import { TornadoClient } from './client/TornadoClient';
import { TornadoTheme } from './theme/theme';
import { autorun, makeObservable, observable } from 'mobx';
import { ThemeDark } from './theme/theme-dark';
import { ThemeLight } from './theme/theme-light';
import { ConceptsStore } from './stores/ConceptsStore';
import { MediaClient } from './client/MediaClient';
import { LayerStore } from './stores/LayerStore';
import { DialogStore } from './stores/DialogStore';

export class System {
  static LIGHT_KEY = 'light_mode';

  client: TornadoClient;
  clientMedia: MediaClient;

  userStore: UserStore;
  layerStore: LayerStore;
  dialogStore: DialogStore;

  @observable
  conceptStore: ConceptsStore;

  @observable
  theme?: TornadoTheme;

  @observable
  title: string;

  constructor() {
    this.title = null;

    if (window.localStorage.getItem(System.LIGHT_KEY) === 'true') {
      this.theme = ThemeLight;
    } else {
      this.theme = ThemeDark;
    }

    // clients
    this.client = new TornadoClient({
      baseURL: window.location.origin
    });
    this.clientMedia = new MediaClient({
      baseURL: window.location.origin
    });

    // stores
    this.userStore = new UserStore({
      client: this.client
    });
    this.layerStore = new LayerStore();
    this.dialogStore = new DialogStore({
      layerStore: this.layerStore
    });

    autorun(() => {
      if (this.userStore.authenticatedUser) {
        this.conceptStore = new ConceptsStore({
          client: this.client,
          userID: this.userStore.authenticatedUser.id
        });
      }
    });
    makeObservable(this);
  }

  updateTitle(title: string) {
    this.title = title;
    document.title = `Tornado${title ? ` | ${title}` : ''}`;
  }

  toggleTheme() {
    if (this.theme.light) {
      this.theme = ThemeDark;
      window.localStorage.setItem(System.LIGHT_KEY, 'false');
    } else {
      this.theme = ThemeLight;
      window.localStorage.setItem(System.LIGHT_KEY, 'true');
    }
  }
}
