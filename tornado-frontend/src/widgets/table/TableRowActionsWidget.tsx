import * as React from 'react';
import styled from '@emotion/styled';

export interface TableRowActionsWidgetProps {
  show: boolean;
}

export const TableRowActionsWidget: React.FC<React.PropsWithChildren<TableRowActionsWidgetProps>> = (props) => {
  return <S.Container show={props.show}>{props.children}</S.Container>;
};
namespace S {
  export const Container = styled.div<{ show: boolean }>`
    visibility: ${(p) => (p.show ? 'visible' : 'hidden')};
  `;
}
