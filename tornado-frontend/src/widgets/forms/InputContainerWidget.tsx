import * as React from 'react';
import { styled } from '../../theme/theme';
import { FONT } from '../../fonts';

export interface InputContainerWidgetProps {
  error: string;
  className?: any;
}

export const InputContainerWidget: React.FC<React.PropsWithChildren<InputContainerWidgetProps>> = (props) => {
  return (
    <S.Container className={props.className}>
      {props.children}
      {props.error ? <S.Error>{props.error}</S.Error> : null}
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div``;

  export const Error = styled.div`
    padding-top: 5px;
    font-size: 15px;
    color: ${(p) => p.theme.controls.error};
    ${FONT}
  `;
}
