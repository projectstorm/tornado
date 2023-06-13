import { AbstractApi, ApiError } from './AbstractApi';
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

  async deleteConcept(user: User, id: number) {
    const found = await this.system.db.conceptBoard.findFirst({
      where: {
        user: {
          id: user.id
        },
        id: id
      }
    });
    if (!found) {
      throw new ApiError('Not allowed');
    }

    return await this.system.db.conceptBoard.delete({
      where: {
        id: id
      }
    });
  }
}
