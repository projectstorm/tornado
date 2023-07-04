import { AbstractApi, ApiError } from './AbstractApi';
import { System } from '../System';
import { ConceptBoard, User } from '@prisma/client';
import { ConceptBoardEncoded } from '@projectstorm/tornado-common';

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

  encodeConcept(concept: ConceptBoard): ConceptBoardEncoded {
    return {
      id: concept.id,
      name: concept.name,
      createdAt: concept.createdAt?.toISOString(),
      updatedAt: concept.updatedAt?.toISOString()
    };
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
