import { UserStore } from './stores/UserStore';
import { TornadoClient } from './client/TornadoClient';
import { TornadoTheme } from './theme/theme';
import { makeObservable, observable } from 'mobx';
import { ThemeDark } from './theme/theme-dark';

export class System {
  userStore: UserStore;
  client: TornadoClient;

  @observable
  theme?: TornadoTheme;

  constructor() {
    this.theme = ThemeDark;

    this.client = new TornadoClient({
      baseURL: window.location.origin
    });
    this.userStore = new UserStore({
      client: this.client
    });

    makeObservable(this);
  }
}
