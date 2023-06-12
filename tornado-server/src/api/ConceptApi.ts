import { AbstractApi } from './AbstractApi';
import { System } from '../System';
import { User } from '@prisma/client';

export class ConceptApi extends AbstractApi {
  constructor(system: System) {
    super({
      system,
      name: 'CONCEPTS'
    });
  }

  async createConcept(user: User, name: string) {
    return await this.system.db.conceptBoard.create({
      data: {
        name,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }
}
