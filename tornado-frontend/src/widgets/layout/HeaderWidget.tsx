import * as React from 'react';
import { styled } from '../../theme/theme';

const logo = require('../../../media/logo-small.png');

export interface HeaderWidgetProps {}

export const HeaderWidget: React.FC<HeaderWidgetProps> = (props) => {
  return (
    <S.Container>
      <S.Logo src={logo}></S.Logo>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: solid 1px ${(p) => p.theme.layout.separatorLine};
  `;

  export const Logo = styled.img`
    height: 40px;
  `;
}
