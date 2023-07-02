import * as React from 'react';
import {
  AbstractReactFactory,
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
import { ControlsElementWidget } from './ControlsElementWidget';

export class ControlsLayerFactory extends AbstractReactFactory<ControlsLayerModel, ConceptCanvasEngine> {
  static TYPE = 'concept/controls/layer';

  constructor() {
    super(ControlsLayerFactory.TYPE);
  }

  generateModel(event: GenerateModelEvent): ControlsLayerModel {
    return new ControlsLayerModel();
  }

  generateReactWidget(event: GenerateWidgetEvent<ControlsLayerModel>): JSX.Element {
    return (
      <>
        {_.map(event.model.getParent().getLayers()[0].getModels(), (m: ImageElement) => {
          return <ControlsElementWidget engine={this.engine} model={m} key={m.getID()} />;
        })}
      </>
    );
  }
}

export type ControlsLayerGenerics = LayerModelGenerics & {
  ENGINE: ConceptCanvasEngine;
  PARENT: ConceptCanvasModel;
};

export class ControlsLayerModel extends LayerModel<ControlsLayerGenerics> {
  constructor() {
    super({
      type: ControlsLayerFactory.TYPE,
      transformed: false
    });
  }

  getChildModelFactoryBank(engine: ControlsLayerGenerics['ENGINE']): FactoryBank<ImageElementFactory> {
    return engine.elementBank;
  }
}
