import * as React from 'react';
import { useButton, UseButtonOptions } from '../../hooks/useButton';
import { useRef } from 'react';
import { styled } from '../../theme/theme';
import { FONT } from '../../fonts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum ButtonType {
  PRIMARY = 'primary',
  NORMAL = 'normal'
}

export interface ButtonWidgetProps extends UseButtonOptions {
  type: ButtonType;
  label?: string;
  icon?: IconProp;
  className?: any;
}

export const ButtonWidget: React.FC<ButtonWidgetProps> = (props) => {
  const ref = useRef<HTMLDivElement>();
  const { loading } = useButton(props, ref);
  return (
    <S.Container className={props.className} ref={ref} type={props.type}>
      {props.label ? <S.Label>{props.label}</S.Label> : null}
      {props.icon ? (
        <S.IconContainer>
          <S.Icon spin={loading} icon={loading ? 'spinner' : props.icon} />
        </S.IconContainer>
      ) : null}
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div<{ type: ButtonType }>`
    border-radius: 6px;
    user-select: none;
    display: inline-flex;
    padding: 5px 10px;
    padding-right: 0;
    background: ${(p) => p.theme.controls.button[p.type].background};
    color: ${(p) => p.theme.controls.button[p.type].color};
    cursor: pointer;

    &:hover {
      background: ${(p) => p.theme.controls.button[p.type].backgroundHover};
      color: ${(p) => p.theme.controls.button[p.type].colorHover};
    }
  `;

  export const Label = styled.div`
    padding-right: 10px;
    font-size: 13px;
    ${FONT};
  `;

  export const IconContainer = styled.div`
    padding-right: 10px;
  `;

  export const Icon = styled(FontAwesomeIcon)``;
}
