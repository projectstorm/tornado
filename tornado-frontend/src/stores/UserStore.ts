import { User } from '@projectstorm/tornado-common';
import { makeObservable, observable } from 'mobx';

export class UserStore {
  @observable
  authenticatedUser: User;

  constructor() {
    this.authenticatedUser = null;
    makeObservable(this);
  }
}
