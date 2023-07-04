import * as React from 'react';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useSystem } from '../../hooks/useSystem';
import { FONT } from '../../fonts';
import { styled } from '../../theme/theme';
import Avatar from 'react-avatar';
import { ButtonType, ButtonWidget } from '../forms/ButtonWidget';
import ReactSwitch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import screenfull from 'screenfull';
import { useForceUpdate } from '../../hooks/useForceUpdate';

export interface HeaderUserWidgetProps {
  className?: any;
  bodyRef: React.RefObject<HTMLDivElement>;
}

export const HeaderUserWidget: React.FC<HeaderUserWidgetProps> = observer((props) => {
  const system = useSystem();
  const forceUpdate = useForceUpdate();
  const user = system.userStore.authenticatedUser;
  useEffect(() => {
    const h = () => {
      forceUpdate();
    };
    screenfull.on('change', h);
    return () => {
      screenfull.off('change', h);
    };
  }, []);
  return (
    <S.Container className={props.className}>
      <S.Switch
        offHandleColor="#555"
        onHandleColor="#999"
        onColor="#c8c8c8"
        offColor="#000"
        height={20}
        width={45}
        checkedIcon={<S.SwitchIconOn icon="sun" />}
        uncheckedIcon={<S.SwitchIconOff icon="moon" />}
        onChange={() => {
          system.toggleTheme();
        }}
        checked={system.theme.light}
      />
      {user ? (
        <>
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
            icon={screenfull.isFullscreen ? 'minimize' : 'expand'}
            action={async () => {
              if (screenfull.isFullscreen) {
                screenfull.exit();
              } else {
                screenfull.request(props.bodyRef.current);
              }
            }}
          />
          <S.Button
            type={ButtonType.NORMAL}
            icon="sign-out"
            action={async () => {
              return system.userStore.signOut();
            }}
          />
        </>
      ) : null}
    </S.Container>
  );
});
namespace S {
  export const SwitchIconOn = styled(FontAwesomeIcon)`
    color: #a1a1a1;
    font-size: 13px;
    padding-left: 5px;
  `;

  export const SwitchIconOff = styled(FontAwesomeIcon)`
    color: #808080;
    font-size: 13px;
    padding-left: 5px;
  `;

  export const Switch = styled(ReactSwitch)``;

  export const Button = styled(ButtonWidget)`
    margin-left: 10px;
  `;

  export const Container = styled.div`
    display: flex;
    align-items: center;
  `;

  export const Label = styled.div`
    margin-left: 10px;
    font-size: 14px;
    color: ${(p) => p.theme.text.description};
    padding-right: 10px;
    ${FONT};
  `;
}
