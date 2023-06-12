import { TornadoClient } from '../client/TornadoClient';
import { ConceptBoard } from '@projectstorm/tornado-common';
import { Collection } from '../data/Collection';
import { computed } from 'mobx';

export interface ConceptsStoreOptions {
  client: TornadoClient;
  userID: number;
}

export class ConceptBoardModel {
  constructor(public data: ConceptBoard) {}

  get id() {
    return this.data.id;
  }
}

export class ConceptsStore {
  _concepts: Collection<ConceptBoardModel, ConceptBoard>;

  constructor(protected options: ConceptsStoreOptions) {
    this._concepts = new Collection({
      create: (c) => new ConceptBoardModel(c),
      update: (c, board) => (board.data = c)
    });
  }

  async createConcept(name: string) {
    const board = await this.options.client.createConcept({
      name: name
    });
    await this.loadConcepts();
    return this.concepts.find((c) => c.id === board.concept.id);
  }

  async loadConcepts() {
    const response = await this.options.client.concepts({
      user_id: this.options.userID
    });
    this._concepts.setValues(response.concepts);
  }

  @computed
  get concepts(): ConceptBoardModel[] {
    return this._concepts.values;
  }
}
