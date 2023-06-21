import * as React from 'react';
import {
  AbstractReactFactory,
  BasePositionModel,
  DeserializeEvent,
  GenerateModelEvent,
  GenerateWidgetEvent
} from '@projectstorm/react-canvas-core';
import { ImageElementWidget } from './ImageElementWidget';

export class ImageElement extends BasePositionModel {
  constructor(public imageID: number) {
    super({
      type: ImageElementFactory.TYPE
    });
    this.setPosition(100, 100);
  }

  serialize() {
    return {
      ...super.serialize(),
      image_id: this.imageID
    };
  }

  deserialize(event: DeserializeEvent<this>) {
    super.deserialize({
      ...event,
      data: {
        ...event.data,
        x: event.data.x || 0,
        y: event.data.y || 0
      }
    });
    this.imageID = event.data.image_id;
    this.setSelected(false);
  }
}

export class ImageElementFactory extends AbstractReactFactory<BasePositionModel> {
  static TYPE = 'concept/image';

  constructor() {
    super(ImageElementFactory.TYPE);
  }

  generateModel(event: GenerateModelEvent): ImageElement {
    return new ImageElement(null);
  }

  generateReactWidget(event: GenerateWidgetEvent<ImageElement>): JSX.Element {
    return <ImageElementWidget key={event.model.getID()} model={event.model} />;
  }
}
