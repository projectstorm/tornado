import * as React from 'react';
import styled from '@emotion/styled';
import { ImageElement } from './ImageElementFactory';

export interface ImageElementWidgetProps {
  model: ImageElement;
}

export const ImageElementWidget: React.FC<ImageElementWidgetProps> = (props) => {
  return (
    <S.Container
      data-imageid={props.model.getID()}
      style={{
        left: props.model.getX(),
        top: props.model.getY()
      }}
    ></S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    position: absolute;
    border: solid 1px red;
    width: 200px;
    height: 200px;
    pointer-events: all;
  `;
}
