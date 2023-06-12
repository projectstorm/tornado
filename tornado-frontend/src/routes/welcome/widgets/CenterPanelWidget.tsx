import * as React from 'react';
import { styled } from '../../../theme/theme';
import { FONT } from '../../../fonts';

export interface CenterPanelWidgetProps {
  heading: string;
  description: string;
}

export const CenterPanelWidget: React.FC<React.PropsWithChildren<CenterPanelWidgetProps>> = (props) => {
  return (
    <S.Container>
      <S.Heading1>{props.heading}</S.Heading1>
      <S.Description>{props.description}</S.Description>
      <S.Content>{props.children}</S.Content>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    padding: 60px;
    border-radius: 15px;
    background: ${(p) => p.theme.layout.centerPanel};
  `;

  export const Content = styled.div`
    padding-top: 20px;
  `;

  export const Heading1 = styled.div`
    text-align: center;
    font-size: 40px;
    padding-bottom: 0;
    color: ${(p) => p.theme.text.heading};
    ${FONT};
  `;

  export const Description = styled.div`
    color: ${(p) => p.theme.text.description};
    text-align: center;
    font-size: 20px;
    padding-bottom: 20px;
    ${FONT};
  `;
}
