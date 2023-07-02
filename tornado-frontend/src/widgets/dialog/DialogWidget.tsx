import * as React from 'react';
import { styled } from '../../theme/theme';
import { ButtonWidget, ButtonWidgetProps } from '../forms/ButtonWidget';
import { FONT } from '../../fonts';

export interface DialogWidgetProps {
  title: string;
  desc: string;
  btns: ButtonWidgetProps[];
}

export const DialogWidget: React.FC<React.PropsWithChildren<DialogWidgetProps>> = (props) => {
  return (
    <S.DialogLayer>
      <S.Container>
        <S.Title>{props.title}</S.Title>
        <S.Desc>{props.desc}</S.Desc>
        {props.children ? <S.Content>{props.children}</S.Content> : null}
        <S.Buttons>
          {props.btns.map((b) => {
            return <S.Button {...b} key={b.label} />;
          })}
        </S.Buttons>
      </S.Container>
    </S.DialogLayer>
  );
};
namespace S {
  export const DialogLayer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  `;
  export const Container = styled.div`
    padding: 50px;
    border-radius: 8px;
    background: ${(p) => p.theme.dialog.background};
    border: solid 1px ${(p) => p.theme.dialog.border};
    box-shadow: 0 11px 30px ${(p) => p.theme.dialog.shadow};
  `;

  export const Title = styled.div`
    color: ${(p) => p.theme.dialog.header};
    font-size: 25px;
    padding-bottom: 20px;
    user-select: none;
    ${FONT};
  `;

  export const Desc = styled.div`
    color: ${(p) => p.theme.dialog.desc};
    font-size: 14px;
    padding-bottom: 20px;
    ${FONT};
  `;

  export const Content = styled.div`
    padding-bottom: 20px;
  `;

  export const Button = styled(ButtonWidget)`
    margin-left: 5px;
  `;

  export const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
  `;
}
