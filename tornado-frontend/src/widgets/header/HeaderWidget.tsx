import * as React from 'react';
import { styled } from '../../theme/theme';
import { HeaderUserWidget } from './HeaderUserWidget';

const logo = require('../../../media/logo-small.png');

export interface HeaderWidgetProps {}

export const HeaderWidget: React.FC<HeaderWidgetProps> = (props) => {
  return (
    <S.Container>
      <S.Logo src={logo}></S.Logo>
      <HeaderUserWidget />
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: solid 1px ${(p) => p.theme.layout.separatorLine};
  `;

  export const Logo = styled.img`
    height: 40px;
  `;
}
