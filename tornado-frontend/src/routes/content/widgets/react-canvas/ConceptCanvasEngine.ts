import * as React from 'react';
import { BaseModel, CanvasEngine, Toolkit } from '@projectstorm/react-canvas-core';

export class ConceptCanvasEngine extends CanvasEngine {
  getMouseElement(event: React.MouseEvent): BaseModel {
    var element = Toolkit.closest(event.target as Element, '[data-imageid]');
    if (element) {
      console.log(element);
      return this.model.getLayers()[0].getModel(element.getAttribute('data-imageid'));
    }

    return super.getMouseElement(event);
  }
}
