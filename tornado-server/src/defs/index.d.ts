import { User as U } from '@projectstorm/tornado-common';

declare global {
  namespace Express {
    export interface User extends U {}
  }
}
