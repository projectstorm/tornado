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

export class DefaultCanvasState extends State<CanvasEngine> {
  dragCanvas: DragCanvasState;
  dragItems: MoveItemsState;

  constructor() {
    super({
      name: 'default-diagrams'
    });
    this.childStates = [new SelectingState()];
    this.dragCanvas = new DragCanvasState({});
    this.dragItems = new MoveItemsState();

    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: (event: ActionEvent<MouseEvent>) => {
          const element = this.engine.getActionEventBus().getModelForEvent(event);

          // the canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.transitionWithEvent(this.dragCanvas, event);
          }
          // move the items (and potentially link points)
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
