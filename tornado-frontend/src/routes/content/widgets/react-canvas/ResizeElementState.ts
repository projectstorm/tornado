import { AbstractDisplacementState, AbstractDisplacementStateEvent } from '@projectstorm/react-canvas-core';
import { CornerPosition } from './controls-layer/ControlsElementWidget';
import { ImageElement } from './image-element/ImageElementFactory';

export class ResizeElementState extends AbstractDisplacementState {
  position: CornerPosition;
  element: ImageElement;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor() {
    super({
      name: 'resize-elements'
    });
  }

  setup(position: CornerPosition, element: ImageElement) {
    this.position = position;
    this.element = element;
    this.width = element.width;
    this.height = element.height;
    this.x = element.getX();
    this.y = element.getY();
  }

  fireMouseMoved(event: AbstractDisplacementStateEvent): any {
    if (this.position === CornerPosition.SE) {
      const newWidth = this.width + event.virtualDisplacementX;
      const newHeight = (newWidth / this.width) * this.height;
      this.element.setSize(newWidth, newHeight);
    } else if (this.position === CornerPosition.NW) {
      const newWidth = this.width - event.virtualDisplacementX;
      const newHeight = (newWidth / this.width) * this.height;
      this.element.setSize(newWidth, newHeight);
      this.element.setPosition(this.x + event.virtualDisplacementX, this.height - newHeight + this.y);
    } else if (this.position === CornerPosition.SW) {
      const newWidth = this.width - event.virtualDisplacementX;
      const newHeight = (newWidth / this.width) * this.height;
      this.element.setSize(newWidth, newHeight);
      this.element.setPosition(this.x + event.virtualDisplacementX, this.y);
    } else if (this.position === CornerPosition.NE) {
      const newWidth = this.width + event.virtualDisplacementX;
      const newHeight = (newWidth / this.width) * this.height;
      this.element.setSize(newWidth, newHeight);
      this.element.setPosition(this.x, this.height - newHeight + this.y);
    }

    this.engine.repaintCanvas();
  }
}
