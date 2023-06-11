import { User } from '@projectstorm/tornado-common';

export const ENV: {
  user?: User;
} = (window as any).env || {};
