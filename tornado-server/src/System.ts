import { PrismaClient } from '@prisma/client';

export class System {
  db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }
}
