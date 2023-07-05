import * as React from 'react';
import { css, Global, ThemeProvider } from '@emotion/react';
import { styled } from '../../theme/theme';
import { ThemeDark } from '../../theme/theme-dark';
import { HeaderWidget } from '../header/HeaderWidget';
import { FooterWidget } from './FooterWidget';
import { BodyWidget } from './BodyWidget';
import { BrowserRouter } from 'react-router-dom';
import { System } from '../../System';
import { SystemContext } from '../../hooks/useSystem';
import { LayersWidget } from './LayersWidget';
import { observer } from 'mobx-react';
import { useRef } from 'react';

export interface RootWidgetProps {
  system: System;
}

export const RootWidget: React.FC<RootWidgetProps> = observer((props) => {
  const bodyRef = useRef<HTMLDivElement>();
  return (
    <>
      <Global styles={S.Global} />
      <ThemeProvider theme={props.system.theme}>
        <BrowserRouter>
          <SystemContext.Provider value={props.system}>
            <S.Container ref={bodyRef}>
              <HeaderWidget bodyRef={bodyRef} />
              <S.Body />
              <FooterWidget />
              <S.Layers />
            </S.Container>
          </SystemContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
});
namespace S {
  export const Container = styled.div`
    background: ${(p) => p.theme.layout.background};
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

  export const Body = styled(BodyWidget)`
    flex-grow: 1;
    overflow-y: auto;
  `;

  export const Layers = styled(LayersWidget)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;

  export const Global = css`
    * {
      margin: 0;
      padding: 0;
    }

    html {
      overflow: hidden;
    }

    html,
    body,
    #application {
      height: 100%;
      width: 100%;
      overscroll-behavior-y: none;
      position: fixed;
    }
  `;
}
