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

export const ControlsElementWidget: React.FC<ControlsElementWidgetProps> = (props) => {
  const canvas = (props.model.getParent() as ImageLayerModel).getParent();
  const zoom = canvas.getZoomLevel() / 100;
  const navigate = useNavigate();

  if (!props.model.isSelected()) {
    return null;
  }

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
          type={ButtonType.NORMAL}
          icon="trash"
          instant={true}
          action={async () => {
            props.model.remove();
            props.engine.repaintCanvas();
          }}
        />
        <S.Button
          type={ButtonType.NORMAL}
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
