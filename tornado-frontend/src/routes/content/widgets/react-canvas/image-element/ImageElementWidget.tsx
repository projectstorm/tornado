import * as React from 'react';
import { useEffect } from 'react';
import { ImageElement } from './ImageElementFactory';
import { ResponseImageWidget } from './ResponseImageWidget';
import { useForceUpdate } from '../../../../../hooks/useForceUpdate';
import { styled } from '../../../../../theme/theme';

export interface ImageElementWidgetProps {
  model: ImageElement;
}

export const ImageElementWidget: React.FC<ImageElementWidgetProps> = (props) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const l = props.model.registerListener({
      selectionChanged: () => {
        forceUpdate();
      }
    });
    return l.deregister;
  }, []);

  return (
    <S.Container
      data-imageid={props.model.getID()}
      selected={props.model.isSelected()}
      style={{
        left: props.model.getX(),
        top: props.model.getY(),
        width: props.model.width,
        height: props.model.height
      }}
    >
      <S.Image model={props.model} />
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div<{ selected: boolean }>`
    position: absolute;
    border: solid 2px ${(p) => (p.selected ? p.theme.editor.selected : 'transparent')};
    ${(p) => (p.selected ? `box-shadow: 0 0 20px ${p.theme.editor.selectedShadow}` : '')};
    box-sizing: border-box;
    pointer-events: all;
  `;

  export const Image = styled(ResponseImageWidget)`
    width: 100%;
    height: 100%;
  `;
}
