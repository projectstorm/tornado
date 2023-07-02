import * as React from 'react';
import { ImageElement } from '../image-element/ImageElementFactory';
import { styled } from '../../../../../theme/theme';
import { useForceUpdate } from '../../../../../hooks/useForceUpdate';
import { useEffect } from 'react';
import { ImageLayerModel } from '../image-layer/ImageLayerFactory';

export interface ControlsElementWidgetProps {
  model: ImageElement;
}

export const ControlsElementWidget: React.FC<ControlsElementWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const l = props.model.registerListener({
      selectionChanged: () => {
        forceUpdate();
      }
    });
    return l.deregister;
  }, []);
  if (!props.model.isSelected()) {
    return null;
  }

  const canvas = (props.model.getParent() as ImageLayerModel).getParent();
  const zoom = canvas.getZoomLevel() / 100;

  return (
    <S.Container
      style={{
        left: props.model.getX() * zoom + canvas.getOffsetX(),
        top: props.model.getY() * zoom + canvas.getOffsetY(),
        width: props.model.width * zoom,
        height: props.model.height * zoom
      }}
    />
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
}
