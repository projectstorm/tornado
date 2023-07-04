import { TornadoClient } from '../client/TornadoClient';
import { BaseListener, BaseObserver, ConceptBoardEncoded } from '@projectstorm/tornado-common';
import { Collection } from '../data/Collection';
import { computed, makeObservable, observable, toJS } from 'mobx';
import { v4 } from 'uuid';

export interface ConceptsStoreOptions {
  client: TornadoClient;
  userID: number;
}

export interface ConceptBoardModelListener extends BaseListener {
  deleted: () => Promise<void>;
}

export interface ConceptBoardModelOptions {
  board: ConceptBoardEncoded;
  client: TornadoClient;
}

export class ConceptBoardModel extends BaseObserver<ConceptBoardModelListener> {
  @observable
  board: ConceptBoardEncoded;

  @observable
  data: {
    cache_id: string;
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

  canvasTranslateCache: {
    offsetX: number;
    offsetY: number;
    zoom: number;
  };

  constructor(protected options: ConceptBoardModelOptions) {
    super();
    this.data = null;
    this.board = options.board;
    this.canvasTranslateCache = null;
    makeObservable(this);
  }

  async getCanvasData() {
    const d = await this.options.client.getConceptData({
      board_id: this.board.id
    });
    if (!d.data) {
      return;
    }
    this.data = {
      ...d.data,
      cache_id: d.data?.cache_id || v4()
    };
  }

  async setCanvasData(data: any) {
    this.data = {
      ...data,
      cache_id: v4()
    };
    await this.options.client.updateConceptData({
      board_id: this.board.id,
      data: toJS(this.data)
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
  _concepts: Collection<ConceptBoardModel, ConceptBoardEncoded>;

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
