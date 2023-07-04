import * as React from 'react';
import {
  BaseModel,
  BasePositionModel,
  CanvasEngine,
  CanvasModel,
  FactoryBank,
  SelectionBoxLayerFactory,
  Toolkit
} from '@projectstorm/react-canvas-core';
import * as _ from 'lodash';
import { ImageElementFactory } from './image-element/ImageElementFactory';
import { ImageLayerFactory } from './image-layer/ImageLayerFactory';
import { DefaultCanvasState } from './DefaultCanvasState';
import { CanvasEngineListener } from '@projectstorm/react-canvas-core';
import { ConceptCanvasModel } from './ConceptCanvasModel';
import { ControlsLayerFactory } from './controls-layer/ControlsLayerFactory';
import { boundingBoxFromPolygons, Rectangle } from '@projectstorm/geometry';

export class ConceptCanvasEngine extends CanvasEngine<CanvasEngineListener, ConceptCanvasModel> {
  elementBank: FactoryBank<ImageElementFactory>;

  constructor() {
    super({
      registerDefaultDeleteItemsAction: true
    });
    this.elementBank = new FactoryBank();
    this.registerFactoryBank(this.elementBank);
    this.elementBank.registerFactory(new ImageElementFactory());

    this.getLayerFactories().registerFactory(new SelectionBoxLayerFactory());
    this.getLayerFactories().registerFactory(new ImageLayerFactory());
    this.getLayerFactories().registerFactory(new ControlsLayerFactory());

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

  getBoundingNodesRect(nodes: BasePositionModel[]): Rectangle {
    if (nodes.length === 0) {
      return new Rectangle();
    }
    return new Rectangle(boundingBoxFromPolygons(nodes.map((node) => node.getBoundingBox())));
  }

  /**
   * FIXME this should go back into react-diagrams along with the dependent functions (the CanvasEngine)
   */
  zoomToFitElements(options: { margin: number; elements: BasePositionModel[]; maxZoom: number }) {
    const { margin, elements, maxZoom } = options;
    const nodesRect = this.getBoundingNodesRect(elements);
    // there is something we should zoom on
    let canvasRect = this.canvas.getBoundingClientRect();

    const calculate = (margin: number = 0) => {
      // work out zoom
      const xFactor = this.canvas.clientWidth / (nodesRect.getWidth() + margin * 2);
      const yFactor = this.canvas.clientHeight / (nodesRect.getHeight() + margin * 2);

      let zoomFactor = xFactor < yFactor ? xFactor : yFactor;
      if (maxZoom && zoomFactor > maxZoom) {
        zoomFactor = maxZoom;
      }

      return {
        zoom: zoomFactor,
        x:
          canvasRect.width / 2 -
          ((nodesRect.getWidth() + margin * 2) / 2 + nodesRect.getTopLeft().x) * zoomFactor +
          margin,
        y:
          canvasRect.height / 2 -
          ((nodesRect.getHeight() + margin * 2) / 2 + nodesRect.getTopLeft().y) * zoomFactor +
          margin
      };
    };

    let params = calculate(0);
    if (margin) {
      if (params.x < margin || params.y < margin) {
        params = calculate(margin);
      }
    }

    // apply
    this.model.setZoomLevel(params.zoom * 100);
    this.model.setOffset(params.x, params.y);
    this.repaintCanvas();
  }
}
