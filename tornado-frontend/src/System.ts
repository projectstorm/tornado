import { UserStore } from './stores/UserStore';
import { TornadoClient } from './client/TornadoClient';

export class System {
  userStore: UserStore;
  client: TornadoClient;

  constructor() {
    this.client = new TornadoClient({
      baseURL: window.location.origin
    });
    this.userStore = new UserStore({
      client: this.client
    });
  }

  init() {}
}
