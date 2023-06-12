import { User } from '@projectstorm/tornado-common';

export const ENV: {
  user?: User;
  site_url: string;
} = (window as any).env || {};
