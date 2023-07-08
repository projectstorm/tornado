import * as React from 'react';
import { styled } from '../../theme/theme';
import { HeaderUserWidget } from './HeaderUserWidget';
import { useNavigate } from 'react-router-dom';
import { Routing } from '../../routes/routes';
import { observer } from 'mobx-react';
import { useSystem } from '../../hooks/useSystem';
import { FONT } from '../../fonts';

const logo_light = require('../../../media/logo-small-light.png');
const logo_dark = require('../../../media/logo-small-dark.png');

export interface HeaderWidgetProps {
  bodyRef: React.RefObject<HTMLDivElement>;
}

export const HeaderWidget: React.FC<HeaderWidgetProps> = observer((props) => {
  const navigate = useNavigate();
  const system = useSystem();

  return (
    <S.Container>
      <S.Logo
        onClick={() => {
          navigate(Routing.CONCEPTS_BOARDS);
        }}
        src={system.theme.light ? logo_dark : logo_light}
      ></S.Logo>
      <S.Title>{system.title}</S.Title>
      <S.Spacer></S.Spacer>
      <HeaderUserWidget bodyRef={props.bodyRef} />
    </S.Container>
  );
});
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: solid 1px ${(p) => p.theme.layout.separatorLine};
    padding-left: 50px;
    padding-right: 50px;
  `;

  export const Title = styled.div`
    font-size: 16px;
    color: ${(p) => p.theme.text.description};
    margin-left: 20px;
    ${FONT};
  `;

  export const Spacer = styled.div`
    flex-grow: 1;
  `;

  export const Logo = styled.img`
    height: 40px;
    cursor: pointer;
  `;
}
