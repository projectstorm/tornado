import { BaseObserver } from '@projectstorm/tornado-common';
import { computed, makeObservable, observable } from 'mobx';
import { JSX } from 'react';
import { v4 } from 'uuid';

export interface LayerListener {
  disposed: () => any;
}

export class Layer extends BaseObserver<LayerListener> {
  id: string;

  constructor(public render: () => JSX.Element) {
    super();
    this.id = v4();
  }

  dispose() {
    this.iterateListeners((cb) => cb.disposed?.());
  }
}

export class LayerStore {
  @observable
  _layers: Set<Layer>;

  constructor() {
    this._layers = new Set<Layer>();
    makeObservable(this);
  }

  @computed
  get layers() {
    return Array.from(this._layers.values());
  }

  addLayer(layer: Layer) {
    this._layers.add(layer);
    layer.registerListener({
      disposed: () => {
        this._layers.delete(layer);
      }
    });
  }
}
