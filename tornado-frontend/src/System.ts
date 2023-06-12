import { UserStore } from './stores/UserStore';
import { TornadoClient } from './client/TornadoClient';
import { TornadoTheme } from './theme/theme';
import { autorun, makeObservable, observable } from 'mobx';
import { ThemeDark } from './theme/theme-dark';
import { ConceptsStore } from './stores/ConceptsStore';

export class System {
  client: TornadoClient;

  userStore: UserStore;

  @observable
  conceptStore: ConceptsStore;

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
}
