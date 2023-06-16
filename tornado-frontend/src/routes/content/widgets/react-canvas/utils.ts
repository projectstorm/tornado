import { CanvasEngine, CanvasModel, FactoryBank, SelectionBoxLayerFactory } from '@projectstorm/react-canvas-core';
import { ImageElement, ImageElementFactory } from './image-element/ImageElementFactory';
import { ImageLayerFactory, ImageLayerModel } from './image-layer/ImageLayerFactory';
import { DefaultCanvasState } from './DefaultCanvasState';
import { ConceptCanvasEngine } from './ConceptCanvasEngine';

const bank = new FactoryBank<ImageElementFactory>();
bank.registerFactory(new ImageElementFactory());

export const createModel = () => {
  const model = new CanvasModel();
  model.setLocked(false);
  const layer = new ImageLayerModel(bank);
  layer.addModel(new ImageElement());

  const m2 = new ImageElement();
  m2.setPosition(400, 600);

  layer.addModel(m2);
  model.addLayer(layer);
  return model;
};

export const createEngine = () => {
  const engine = new ConceptCanvasEngine();

  engine.registerFactoryBank(bank);

  engine.getLayerFactories().registerFactory(new SelectionBoxLayerFactory());
  engine.getLayerFactories().registerFactory(new ImageLayerFactory(bank));
  engine.getStateMachine().pushState(new DefaultCanvasState());

  engine.setModel(createModel());
  return engine;
};
