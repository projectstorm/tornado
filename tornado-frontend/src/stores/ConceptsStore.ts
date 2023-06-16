import { TornadoClient } from '../client/TornadoClient';
import { BaseListener, BaseObserver, ConceptBoard } from '@projectstorm/tornado-common';
import { Collection } from '../data/Collection';
import { computed } from 'mobx';

export interface ConceptsStoreOptions {
  client: TornadoClient;
  userID: number;
}

export interface ConceptBoardModelListener extends BaseListener {
  deleted: () => Promise<void>;
}

export class ConceptBoardModel extends BaseObserver<ConceptBoardModelListener> {
  constructor(public data: ConceptBoard) {
    super();
  }

  get id() {
    return this.data.id;
  }

  async delete() {
    return this.iterateListenersAsync((cb) => cb.deleted?.());
  }

  async loadData() {}
}

export class ConceptsStore {
  _concepts: Collection<ConceptBoardModel, ConceptBoard>;

  constructor(protected options: ConceptsStoreOptions) {
    this._concepts = new Collection({
      create: (c) => {
        const board = new ConceptBoardModel(c);
        board.registerListener({
          deleted: async () => {
            await this.options.client.deleteConcept({
              board_id: board.id
            });
            await this.loadConcepts();
          }
        });
        return board;
      },
      update: (c, board) => (board.data = c)
    });
  }

  async loadConcept(id: string) {
    await this.loadConcepts();
  }

  async createConcept(name: string) {
    const board = await this.options.client.createConcept({
      name: name
    });
    await this.loadConcepts();
    return this.concepts.find((c) => c.id === board.concept.id);
  }

  async loadConcepts() {
    const response = await this.options.client.concepts();
    this._concepts.setValues(response.concepts);
  }

  getConcept(id: number) {
    return this._concepts.getValue(id);
  }

  @computed
  get concepts(): ConceptBoardModel[] {
    return this._concepts.values;
  }
}
