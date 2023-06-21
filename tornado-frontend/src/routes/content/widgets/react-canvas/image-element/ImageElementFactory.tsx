import * as React from 'react';
import {
  AbstractReactFactory,
  BasePositionModel,
  DeserializeEvent,
  GenerateModelEvent,
  GenerateWidgetEvent
} from '@projectstorm/react-canvas-core';
import { ImageElementWidget } from './ImageElementWidget';
import { ImageLayerModel } from '../image-layer/ImageLayerFactory';

export class ImageElement extends BasePositionModel {
  public width: number;
  public height: number;

  constructor(public imageID: number) {
    super({
      type: ImageElementFactory.TYPE
    });
    this.setPosition(100, 100);
    this.width = null;
    this.height = null;
  }

  getCanvasModel() {
    return (this.getParent() as ImageLayerModel).getParent();
  }

  serialize() {
    return {
      ...super.serialize(),
      image_id: this.imageID,
      width: this.width,
      height: this.height
    };
  }

  deserialize(event: DeserializeEvent<this>) {
    super.deserialize(event);
    this.imageID = event.data.image_id;
    this.width = event.data.width;
    this.height = event.data.height;
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
