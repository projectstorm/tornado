import * as React from 'react';
import {
  BaseModel,
  CanvasEngine,
  CanvasModel,
  FactoryBank,
  SelectionBoxLayerFactory,
  Toolkit
} from '@projectstorm/react-canvas-core';
import { ImageElementFactory } from './image-element/ImageElementFactory';
import { ImageLayerFactory } from './image-layer/ImageLayerFactory';
import { DefaultCanvasState } from './DefaultCanvasState';
import { CanvasEngineListener } from '@projectstorm/react-canvas-core';
import { ConceptCanvasModel } from './ConceptCanvasModel';

export class ConceptCanvasEngine extends CanvasEngine<CanvasEngineListener, ConceptCanvasModel> {
  elementBank: FactoryBank<ImageElementFactory>;

  constructor() {
    super();
    this.elementBank = new FactoryBank();
    this.elementBank.registerFactory(new ImageElementFactory());
    this.registerFactoryBank(this.elementBank);

    this.getLayerFactories().registerFactory(new SelectionBoxLayerFactory());
    this.getLayerFactories().registerFactory(new ImageLayerFactory());
    this.getStateMachine().pushState(new DefaultCanvasState());

    // @ts-ignore
    this.setModel(new CanvasModel());
  }

  getMouseElement(event: React.MouseEvent): BaseModel {
    var element = Toolkit.closest(event.target as Element, '[data-imageid]');
    if (element) {
      return this.model.getLayers()[0].getModel(element.getAttribute('data-imageid'));
    }

    return super.getMouseElement(event);
  }
}
