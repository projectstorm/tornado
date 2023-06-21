import * as React from 'react';
import styled from '@emotion/styled';
import { ImageElement } from './ImageElementFactory';
import { ResponseImageWidget } from './ResponseImageWidget';
import { useEffect } from 'react';
import { useForceUpdate } from '../../../../../hooks/useForceUpdate';

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
        top: props.model.getY()
      }}
    >
      <S.Image id={props.model.imageID} />
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div<{ selected: boolean }>`
    position: absolute;
    border: solid 1px ${(p) => (p.selected ? 'cyan' : 'transparent')};
    width: 200px;
    height: 200px;
    pointer-events: all;
  `;

  export const Image = styled(ResponseImageWidget)`
    width: 100%;
    height: 100%;
  `;
}
