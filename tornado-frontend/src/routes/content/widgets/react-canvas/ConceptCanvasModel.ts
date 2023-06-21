import { CanvasEngine, CanvasModel, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { ImageLayerModel } from './image-layer/ImageLayerFactory';
import { ConceptBoardModel } from '../../../../stores/ConceptsStore';
import * as _ from 'lodash';
import { ImageElement } from './image-element/ImageElementFactory';
import { action } from 'mobx';

export class ConceptCanvasModel extends CanvasModel {
  constructor(protected model: ConceptBoardModel) {
    super();

    const layer = new ImageLayerModel();
    this.addLayer(layer);
  }

  load(engine: CanvasEngine) {
    if (!this.model.board.data) {
      return;
    }
    this.deserializeModel(this.model.board.data, engine);
  }

  @action deserialize(event: DeserializeEvent<this>) {
    this.layers = [];
    super.deserialize(event);
  }

  save = _.debounce(() => {
    this.model.setCanvasData(this.serialize());
  }, 500);

  addImage(id: number) {
    this.getLayers()[0].addModel(new ImageElement(id));
  }
}
