import * as React from 'react';
import { styled } from '../../../theme/theme';
import { FONT } from '../../../fonts';

export interface CenterPanelWidgetProps {
  heading: string;
  description: string;
}

export const CenterPanelWidget: React.FC<React.PropsWithChildren<CenterPanelWidgetProps>> = (props) => {
  return <S.Container>{props.children}</S.Container>;
};
namespace S {
  export const Container = styled.div`
    padding: 60px;
    border-radius: 15px;
    background: ${(p) => p.theme.layout.centerPanel};
  `;

  export const Content = styled.div``;

  export const Heading1 = styled.div`
    text-align: center;
    font-size: 40px;
    padding-bottom: 20px;
    ${FONT};
  `;

  export const Description = styled.div`
    text-align: center;
    font-size: 20px;
    padding-bottom: 20px;
    ${FONT};
  `;
}
