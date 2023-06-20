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
    layer.registerListener({
      added: ({ model }) => {
        this.save();

        model.registerListener({
          positionChanged: () => {
            this.save();
          },
          entityRemoved: () => {
            this.save();
          }
        });
      }
    });
    this.addLayer(layer);
  }

  load(engine: CanvasEngine) {
    // @ts-ignore
    this.deserialize({
      data: this.model.board.data || {},
      engine: engine
    });
  }

  @action deserialize(event: DeserializeEvent<this>) {
    this.removeLayer(this.layers[0]);
    super.deserialize({
      ...event,
      data: {
        ...event.data,
        offsetX: 0,
        offsetY: 0
      }
    });
  }

  save = _.debounce(() => {
    this.model.setCanvasData(this.serialize());
  }, 500);

  addImage(id: number) {
    this.getLayers()[0].addModel(new ImageElement(id));
  }
}
