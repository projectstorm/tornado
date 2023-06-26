import * as React from 'react';
import { styled } from '../../theme/theme';
import { FONT } from '../../fonts';
import { ENV } from '../../Env';

export interface FooterWidgetProps {}

export const FooterWidget: React.FC<FooterWidgetProps> = (props) => {
  return (
    <S.Container>
      <S.Meta>By Project STORM</S.Meta>
      <S.Meta>Version {ENV.version}</S.Meta>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: solid 1px ${(p) => p.theme.layout.separatorLine};
    padding-left: 50px;
    padding-right: 50px;
  `;

  export const Meta = styled.div`
    margin-right: 20px;
    color: ${(p) => p.theme.text.description};
    ${FONT};
    font-size: 12px;
  `;
}
