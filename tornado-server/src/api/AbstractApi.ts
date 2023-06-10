import { System } from '../System';
import { Logger } from '@projectstorm/tornado-common';

export interface AbstractApiOptions {
  name: string;
  system: System;
}

export class AbstractApi {
  logger: Logger;

  constructor(protected options: AbstractApiOptions) {
    this.logger = new Logger({
      name: `API:${options.name}`
    });
  }

  get system() {
    return this.options.system;
  }
}
