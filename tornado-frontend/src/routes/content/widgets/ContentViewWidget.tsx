import * as React from 'react';
import { styled } from '../../../theme/theme';

export interface ContentViewWidgetProps {
  className?: any;
}

export const ContentViewWidget: React.FC<ContentViewWidgetProps> = (props) => {
  return <S.Container className={props.className}></S.Container>;
};
namespace S {
  export const Container = styled.div`
    background-image: linear-gradient(
      45deg,
      ${(p) => p.theme.editor.stripes} 25%,
      ${(p) => p.theme.editor.background} 25%,
      ${(p) => p.theme.editor.background} 50%,
      ${(p) => p.theme.editor.stripes} 50%,
      ${(p) => p.theme.editor.stripes} 75%,
      ${(p) => p.theme.editor.background} 75%,
      ${(p) => p.theme.editor.background} 100%
    );
    background-size: 8.49px 8.49px;
    border-radius: 20px;
  `;
}
