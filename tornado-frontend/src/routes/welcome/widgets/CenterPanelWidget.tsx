import * as React from 'react';
import { styled } from '../../../theme/theme';

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
}
