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

export class ImageLayerFactory extends AbstractReactFactory<ImageLayerModel> {
  static TYPE = 'concept/image/layer';

  constructor(protected bank2: FactoryBank<ImageElementFactory>) {
    super(ImageLayerFactory.TYPE);
  }

  generateModel(event: GenerateModelEvent): ImageLayerModel {
    return new ImageLayerModel(this.bank2);
  }

  generateReactWidget(event: GenerateWidgetEvent<ImageLayerModel>): JSX.Element {
    return (
      <>
        {_.map(event.model.getModels(), (m: ImageElement) => {
          return this.bank2.getFactory(m.getType()).generateReactWidget({
            model: m
          });
        })}
      </>
    );
  }
}

export class ImageLayerModel extends LayerModel {
  constructor(protected bank: FactoryBank<ImageElementFactory>) {
    super({
      type: ImageLayerFactory.TYPE,
      transformed: true
    });
  }

  getChildModelFactoryBank(engine: LayerModelGenerics['ENGINE']): FactoryBank<ImageElementFactory> {
    return this.bank;
  }
}
