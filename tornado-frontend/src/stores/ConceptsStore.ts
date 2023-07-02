import { TornadoClient } from '../client/TornadoClient';
import { BaseListener, BaseObserver, ConceptBoard } from '@projectstorm/tornado-common';
import { Collection } from '../data/Collection';
import { computed, makeObservable, observable } from 'mobx';

export interface ConceptsStoreOptions {
  client: TornadoClient;
  userID: number;
}

export interface ConceptBoardModelListener extends BaseListener {
  deleted: () => Promise<void>;
}

export interface ConceptBoardModelOptions {
  board: ConceptBoard;
  client: TornadoClient;
}

export class ConceptBoardModel extends BaseObserver<ConceptBoardModelListener> {
  @observable
  board: ConceptBoard & {
    data: {
      layers: {
        models: {
          [id: string]: {
            width: number;
            height: number;
            image_id: number;
          };
        };
      }[];
    };
  };

  constructor(protected options: ConceptBoardModelOptions) {
    super();
    this.board = options.board;
    makeObservable(this);
  }

  async setCanvasData(data: any) {
    this.board.data = data;
    await this.options.client.updateConcept({
      board: this.board
    });
  }

  async setName(name: string) {
    this.board.name = name;
    await this.options.client.updateConcept({
      board: this.board
    });
  }

  get id() {
    return this.board.id;
  }

  async delete() {
    return this.iterateListenersAsync((cb) => cb.deleted?.());
  }
}

export class ConceptsStore {
  _concepts: Collection<ConceptBoardModel, ConceptBoard>;

  constructor(protected options: ConceptsStoreOptions) {
    this._concepts = new Collection({
      create: (c) => {
        const board = new ConceptBoardModel({
          board: c,
          client: options.client
        });
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
      update: (c, board) => (board.board = c)
    });
  }

  async loadConcept(id: number) {
    // FIXME be more specific
    await this.loadConcepts();
    return this._concepts.getValue(id);
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
