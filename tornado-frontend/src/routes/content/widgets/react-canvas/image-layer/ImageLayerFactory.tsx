import * as React from 'react';
import {
  AbstractReactFactory,
  BaseEvent,
  BaseModelListener,
  DeserializeEvent,
  FactoryBank,
  GenerateModelEvent,
  GenerateWidgetEvent,
  LayerModel,
  LayerModelGenerics
} from '@projectstorm/react-canvas-core';
import { ImageElement, ImageElementFactory } from '../image-element/ImageElementFactory';
import * as _ from 'lodash';
import { ConceptCanvasEngine } from '../ConceptCanvasEngine';
import { ConceptCanvasModel } from '../ConceptCanvasModel';

export class ImageLayerFactory extends AbstractReactFactory<ImageLayerModel, ConceptCanvasEngine> {
  static TYPE = 'concept/image/layer';

  constructor() {
    super(ImageLayerFactory.TYPE);
  }

  generateModel(event: GenerateModelEvent): ImageLayerModel {
    return new ImageLayerModel();
  }

  generateReactWidget(event: GenerateWidgetEvent<ImageLayerModel>): JSX.Element {
    return (
      <>
        {_.map(event.model.getModels(), (m: ImageElement) => {
          return this.engine.elementBank.getFactory(m.getType()).generateReactWidget({
            model: m
          });
        })}
      </>
    );
  }
}

export interface ImageLayerModelListener extends BaseModelListener {
  added: (element: BaseEvent & { model: ImageElement }) => any;
}

export type ImageLayerGenerics = LayerModelGenerics & {
  ENGINE: ConceptCanvasEngine;
  LISTENER: ImageLayerModelListener;
  PARENT: ConceptCanvasModel;
};

export class ImageLayerModel extends LayerModel<ImageLayerGenerics> {
  deserializing: boolean;

  constructor() {
    super({
      type: ImageLayerFactory.TYPE,
      transformed: true
    });

    this.deserializing = false;

    this.registerListener({
      added: ({ model }) => {
        this.save();
        model.registerListener({
          positionChanged: () => {
            this.save();
          },
          sizeUpdated: () => {
            this.save();
          },
          entityRemoved: () => {
            this.removeModel(model);
            this.save();
          }
        });
      }
    });
  }

  save() {
    if (this.deserializing) {
      return;
    }
    this.getParent().save();
  }

  deserialize(event: DeserializeEvent) {
    this.deserializing = true;
    super.deserialize(event);
    this.deserializing = false;
  }

  addModel(model: ImageLayerGenerics['CHILDREN']) {
    super.addModel(model);
    this.fireEvent({ model: model }, 'added');
  }

  getChildModelFactoryBank(engine: ImageLayerGenerics['ENGINE']): FactoryBank<ImageElementFactory> {
    return engine.elementBank;
  }
}
