import * as React from 'react';
import { styled } from '../../theme/theme';

export interface FooterWidgetProps {}

export const FooterWidget: React.FC<FooterWidgetProps> = (props) => {
  return <S.Container></S.Container>;
};
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: solid 1px ${(p) => p.theme.layout.separatorLine};
  `;
}
