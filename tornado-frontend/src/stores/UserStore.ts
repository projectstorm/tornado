import { User } from '@projectstorm/tornado-common';
import { makeObservable, observable } from 'mobx';
import { TornadoClient } from '../client/TornadoClient';

export interface UserStoreOptions {
  client: TornadoClient;
}

export class UserStore {
  @observable
  authenticatedUser: User;

  constructor(protected options: UserStoreOptions) {
    this.authenticatedUser = null;
    makeObservable(this);
  }

  async signIn(username: string, password: string): Promise<boolean> {
    try {
      const res = await this.options.client.login({
        username,
        password
      });
      this.authenticatedUser = res.user;
      return true;
    } catch (ex) {}
    return false;
  }
}
