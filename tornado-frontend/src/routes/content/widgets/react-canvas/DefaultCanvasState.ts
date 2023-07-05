import { MouseEvent, TouchEvent } from 'react';
import {
  Action,
  ActionEvent,
  CanvasEngine,
  DragCanvasState,
  InputType,
  MoveItemsState,
  SelectingState,
  State
} from '@projectstorm/react-canvas-core';
import { ResizeElementState } from './ResizeElementState';
import { CornerPosition } from './controls-layer/ControlsElementWidget';
import { ImageElement } from './image-element/ImageElementFactory';

export class DefaultCanvasState extends State<CanvasEngine> {
  dragCanvas: DragCanvasState;
  resizeElement: ResizeElementState;
  dragItems: MoveItemsState;

  constructor() {
    super({
      name: 'default-diagrams'
    });
    this.childStates = [new SelectingState()];
    this.dragCanvas = new DragCanvasState({});
    this.resizeElement = new ResizeElementState();
    this.dragItems = new MoveItemsState();

    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: (event: ActionEvent<MouseEvent>) => {
          const element = this.engine.getActionEventBus().getModelForEvent(event);

          if ((event.event.target as HTMLDivElement).dataset.anchorposition) {
            this.resizeElement.setup(
              (event.event.target as HTMLDivElement).dataset.anchorposition as CornerPosition,
              element as ImageElement
            );
            this.transitionWithEvent(this.resizeElement, event);
            return true;
          }

          // the canvas was clicked on, transition to the dragging canvas state
          if (!element || event.event.button === 1) {
            this.transitionWithEvent(this.dragCanvas, event);
          }
          // move the items
          else {
            this.transitionWithEvent(this.dragItems, event);
          }
        }
      })
    );

    // touch drags the canvas
    this.registerAction(
      new Action({
        type: InputType.TOUCH_START,
        fire: (event: ActionEvent<TouchEvent>) => {
          this.transitionWithEvent(this.dragCanvas, event);
        }
      })
    );
  }
}
