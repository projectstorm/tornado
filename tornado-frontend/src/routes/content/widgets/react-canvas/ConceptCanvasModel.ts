import { CanvasEngine, CanvasModel, DeserializeEvent } from '@projectstorm/react-canvas-core';
import { ImageLayerModel } from './image-layer/ImageLayerFactory';
import { ConceptBoardModel } from '../../../../stores/ConceptsStore';
import * as _ from 'lodash';
import { ImageElement } from './image-element/ImageElementFactory';
import { action } from 'mobx';
import { FileData } from '@projectstorm/tornado-common';
import { ControlsLayerModel } from './controls-layer/ControlsLayerFactory';

export class ConceptCanvasModel extends CanvasModel {
  constructor(public model: ConceptBoardModel) {
    super();

    this.addLayer(new ImageLayerModel());
    this.addLayer(new ControlsLayerModel());
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

  addImage(data: FileData) {
    const element = new ImageElement(data.id);

    const size = 500;
    element.width = size;
    element.height = (size / data.width) * data.height;

    this.getLayers()[0].addModel(element);
  }
}
