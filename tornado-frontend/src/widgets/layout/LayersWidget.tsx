import * as React from 'react';
import styled from '@emotion/styled';
import { Layer } from '../../stores/LayerStore';
import { useSystem } from '../../hooks/useSystem';

export interface LayersWidgetProps {
  className?: any;
}

export const LayerWidget: React.FC<{ layer: Layer; index: number }> = (props) => {
  return <S.Layer index={props.index}>{props.layer.render()}</S.Layer>;
};

export const LayersWidget: React.FC<LayersWidgetProps> = (props) => {
  const system = useSystem();
  return (
    <S.Container className={props.className}>
      <S.Layers>
        {system.layerStore.layers.map((l, index) => {
          return <LayerWidget index={index} layer={l} key={l.id} />;
        })}
      </S.Layers>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    pointer-events: none;
  `;

  export const Layers = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: none;
  `;

  export const Layer = styled.div<{ index: number }>`
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: all;
  `;
}
