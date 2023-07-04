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
import { FileData } from '@projectstorm/tornado-common';

export class ImageElement extends BasePositionModel {
  public width: number;
  public height: number;

  constructor(public imageID: number = null) {
    super({
      type: ImageElementFactory.TYPE
    });
    this.width = 200;
    this.height = 200;
    this.setPosition(100, 100);
    this.setLocked(false);
  }

  getCanvasModel() {
    return (this.getParent() as ImageLayerModel).getParent();
  }

  update(data: FileData) {
    const size = 500;
    this.imageID = data.id;
    this.width = size;
    this.height = (size / data.width) * data.height;
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
