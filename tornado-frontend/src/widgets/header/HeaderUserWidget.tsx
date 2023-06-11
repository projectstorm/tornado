import * as React from 'react';
import { observer } from 'mobx-react';
import { useSystem } from '../../hooks/useSystem';
import { FONT } from '../../fonts';
import { styled } from '../../theme/theme';
import Avatar from 'react-avatar';
import { ButtonType, ButtonWidget } from '../forms/ButtonWidget';

export interface HeaderUserWidgetProps {
  className?: any;
}

export const HeaderUserWidget: React.FC<HeaderUserWidgetProps> = observer((props) => {
  const system = useSystem();
  const user = system.userStore.authenticatedUser;
  if (!user) {
    return null;
  }
  return (
    <S.Container className={props.className}>
      <S.Label>{user.name}</S.Label>
      <Avatar
        name={user.name}
        round={true}
        size={'30px'}
        email={user.email}
        color={system.theme.controls.button.primary.backgroundHover}
        fgColor={system.theme.controls.button.primary.colorHover}
      />
      <S.Button
        type={ButtonType.NORMAL}
        icon="sign-out"
        action={async () => {
          return system.userStore.signOut();
        }}
      />
    </S.Container>
  );
});
namespace S {
  export const Button = styled(ButtonWidget)`
    margin-left: 10px;
  `;

  export const Container = styled.div`
    display: flex;
    align-items: center;
  `;

  export const Label = styled.div`
    font-size: 14px;
    color: ${(p) => p.theme.text.description};
    padding-right: 10px;
    ${FONT};
  `;
}
