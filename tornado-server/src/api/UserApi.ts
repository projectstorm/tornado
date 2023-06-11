import { AbstractApi } from './AbstractApi';
import { System } from '../System';
import * as crypto from 'crypto';

export class UserApi extends AbstractApi {
  constructor(system: System) {
    super({
      system: system,
      name: 'USERS'
    });
  }

  createSalt() {
    return crypto.randomBytes(16).toString('utf8');
  }

  async hashPassword(password: string, salt: string) {
    return await new Promise<Buffer>(async (resolve, reject) => {
      crypto.pbkdf2(password, salt, 1000, 512, 'sha512', (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  async authenticateUser(email: string, password: string) {
    const user = await this.system.db.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      return false;
    }

    if (!user.password) {
      this.logger.warn(`User ${user.id} is missing a password`);
      return false;
    }
    const password2 = await this.hashPassword(password, user.salt);

    if (user.password.toString() === password2.toString()) {
      return user;
    }
    return false;
  }
}
