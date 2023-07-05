import * as React from 'react';
import { ImageElement } from '../image-element/ImageElementFactory';
import { styled } from '../../../../../theme/theme';
import { ImageLayerModel } from '../image-layer/ImageLayerFactory';
import { ButtonType, ButtonWidget } from '../../../../../widgets/forms/ButtonWidget';
import { CanvasEngine } from '@projectstorm/react-canvas-core';
import { generatePath, useNavigate } from 'react-router-dom';
import { Routing } from '../../../../routes';

export interface ControlsElementWidgetProps {
  model: ImageElement;
  engine: CanvasEngine;
}

export enum CornerPosition {
  NW = 'nw',
  NE = 'ne',
  SW = 'sw',
  SE = 'se'
}

const ANCHOR_SIZE = 14;

export const ControlsElementWidget: React.FC<ControlsElementWidgetProps> = (props) => {
  const canvas = (props.model.getParent() as ImageLayerModel).getParent();
  const zoom = canvas.getZoomLevel() / 100;
  const navigate = useNavigate();

  if (!props.model.isSelected()) {
    return null;
  }

  const offset = (-1 * ANCHOR_SIZE) / 2;

  return (
    <S.Container
      style={{
        left: props.model.getX() * zoom + canvas.getOffsetX(),
        top: props.model.getY() * zoom + canvas.getOffsetY(),
        width: props.model.width * zoom,
        height: props.model.height * zoom
      }}
    >
      <S.Controls>
        <S.Button
          type={ButtonType.DISCRETE}
          icon="trash"
          instant={true}
          action={async () => {
            props.model.remove();
            props.engine.repaintCanvas();
          }}
        />
        <S.Button
          type={ButtonType.DISCRETE}
          icon="crop"
          instant={true}
          action={async () => {
            const canvasModel = props.model.getCanvasModel();
            canvasModel.model.canvasTranslateCache = {
              zoom: canvasModel.getZoomLevel(),
              offsetX: canvasModel.getOffsetX(),
              offsetY: canvasModel.getOffsetY()
            };
            navigate(
              generatePath(Routing.CONCEPTS_BOARD_IMAGE_CROP, {
                board: `${props.model.getCanvasModel().model.id}`,
                image: `${props.model.imageID}`
              })
            );
          }}
        />
      </S.Controls>
      <S.Anchor
        data-anchorposition={CornerPosition.NW}
        data-imageid={props.model.getID()}
        style={{
          top: offset,
          left: offset,
          cursor: 'nw-resize'
        }}
      />
      <S.Anchor
        data-anchorposition={CornerPosition.NE}
        data-imageid={props.model.getID()}
        style={{
          top: offset,
          right: offset,
          cursor: 'ne-resize'
        }}
      />
      <S.Anchor
        data-anchorposition={CornerPosition.SE}
        data-imageid={props.model.getID()}
        style={{
          bottom: offset,
          right: offset,
          cursor: 'se-resize'
        }}
      />
      <S.Anchor
        data-anchorposition={CornerPosition.SW}
        data-imageid={props.model.getID()}
        style={{
          bottom: offset,
          left: offset,
          cursor: 'sw-resize'
        }}
      />
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    position: absolute;
    border: solid 2px ${(p) => p.theme.editor.selected};
    box-shadow: 0 0 20px ${(p) => p.theme.editor.selectedShadow};
    box-sizing: border-box;
    pointer-events: none;
  `;

  export const Anchor = styled.div`
    box-sizing: border-box;
    position: absolute;
    border: solid 2px ${(p) => p.theme.editor.selected};
    width: ${ANCHOR_SIZE}px;
    height: ${ANCHOR_SIZE}px;
    background: ${(p) => p.theme.editor.selectedShadow};
    pointer-events: all;
  `;

  export const Controls = styled.div`
    position: absolute;
    top: -40px;
    right: 0;
    display: flex;
  `;

  export const Button = styled(ButtonWidget)`
    pointer-events: all;
    margin-left: 5px;
    overflow: visible;
  `;
}
