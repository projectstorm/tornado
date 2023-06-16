import { action, makeObservable, observable } from 'mobx';
import * as _ from 'lodash';

export interface CollectionOptions<Decoded, Encoded> {
  create: (e: Encoded) => Decoded;
  update: (e: Encoded, d: Decoded) => void;
}

export class Collection<Decoded extends { id: number }, Encoded extends { id: number }> {
  @observable
  data: Map<number, Decoded>;

  constructor(protected options: CollectionOptions<Decoded, Encoded>) {
    this.data = new Map();
    makeObservable(this);
  }

  @action
  setValues(values: Encoded[]) {
    let keys = Array.from(this.data.keys());
    let keys2 = values.map((v) => v.id);

    // to remove
    _.difference(keys, keys2).forEach((c) => {
      this.data.delete(c);
    });

    // to add
    values.forEach((v) => {
      if (this.data.has(v.id)) {
        this.options.update(v, this.data.get(v.id));
      } else {
        this.data.set(v.id, this.options.create(v));
      }
    });
  }

  getValue(id: number) {
    return this.data.get(id);
  }

  get values() {
    return Array.from(this.data.values());
  }
}
