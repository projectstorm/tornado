import { PrismaClient } from '@prisma/client';
import { ENV } from './Env';
import { UserApi } from './api/UserApi';
import { Logger } from '@projectstorm/tornado-common';

export class System {
  db: PrismaClient;

  users: UserApi;
  logger: Logger;

  constructor() {
    this.db = new PrismaClient({
      datasources: {
        db: {
          url: ENV.DATABASE_URL
        }
      }
    });
    this.logger = new Logger({
      name: 'SYSTEM'
    });
    this.users = new UserApi(this);
  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async init() {
    // attempt to connect to database
    do {
      try {
        await this.db.$connect();
        this.logger.info('Database connected!');
        break;
      } catch (ex) {
        this.logger.info('Could not connect to db, trying again in a moment...');
        await this.sleep(2000);
      }
    } while (true);

    // check for root user
    const users = await this.db.user.count();
    if (users === 0) {
      this.logger.info('Admin user not found, creating');
      const salt = this.users.createSalt();
      const password = await this.users.hashPassword(ENV.ADMIN_USER_PASS, salt);
      try {
        await this.db.user.create({
          data: {
            salt: salt,
            email: ENV.ADMIN_USER_EMAIL,
            password: password
          }
        });
        this.logger.info('User created!');
      } catch (ex) {
        this.logger.error(`Failed to create admin user`, ex);
      }
    }

    this.logger.info('System startup complete!');
  }
}
