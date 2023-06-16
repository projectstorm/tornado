import * as React from 'react';
import {
  AbstractReactFactory,
  BasePositionModel,
  GenerateModelEvent,
  GenerateWidgetEvent
} from '@projectstorm/react-canvas-core';
import { ImageElementWidget } from './ImageElementWidget';

export class ImageElement extends BasePositionModel {
  constructor() {
    super({
      type: ImageElementFactory.TYPE
    });
    this.setPosition(100, 100);
  }
}

export class ImageElementFactory extends AbstractReactFactory<BasePositionModel> {
  static TYPE = 'concept/image';

  constructor() {
    super(ImageElementFactory.TYPE);
  }

  generateModel(event: GenerateModelEvent): BasePositionModel {
    return new ImageElement();
  }

  generateReactWidget(event: GenerateWidgetEvent<BasePositionModel>): JSX.Element {
    return <ImageElementWidget model={event.model} />;
  }
}
