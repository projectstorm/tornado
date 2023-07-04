import * as React from 'react';
import { ImageElement } from './ImageElementFactory';
import { ResponseImageWidget } from './ResponseImageWidget';
import { styled } from '../../../../../theme/theme';

export interface ImageElementWidgetProps {
  model: ImageElement;
  focus: () => any;
}

export const ImageElementWidget: React.FC<ImageElementWidgetProps> = (props) => {
  return (
    <S.Container
      onDoubleClick={() => {
        props.focus?.();
      }}
      data-imageid={props.model.getID()}
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
  export const Container = styled.div`
    position: absolute;
    box-sizing: border-box;
    pointer-events: all;
  `;

  export const Image = styled(ResponseImageWidget)`
    width: 100%;
    height: 100%;
  `;
}
