import * as React from 'react';
import { useButton, UseButtonOptions } from '../../hooks/useButton';
import { useRef } from 'react';
import { styled } from '../../theme/theme';

export enum ButtonType {
  PRIMARY = 'primary',
  NORMAL = 'normal'
}

export interface ButtonWidgetProps extends UseButtonOptions {
  type: ButtonType;
}

export const ButtonWidget: React.FC<ButtonWidgetProps> = (props) => {
  const ref = useRef<HTMLDivElement>();
  const { loading } = useButton(props, ref);
  return <S.Container ref={ref} type={props.type}></S.Container>;
};
namespace S {
  export const Container = styled.div<{ type: ButtonType }>`
    background: ${(p) => p.theme.controls.button[p.type].background};
    color: ${(p) => p.theme.controls.button[p.type].color};

    &:hover {
      background: ${(p) => p.theme.controls.button[p.type].backgroundHover};
      color: ${(p) => p.theme.controls.button[p.type].colorHover};
    }
  `;

  export const Icon = styled.div``;
}
