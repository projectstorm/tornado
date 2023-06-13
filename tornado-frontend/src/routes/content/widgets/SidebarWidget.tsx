import * as React from 'react';
import styled from '@emotion/styled';

export interface SidebarWidgetProps {
  className?: any;
}

export const SidebarWidget: React.FC<SidebarWidgetProps> = (props) => {
  return <S.Container className={props.className}></S.Container>;
};
namespace S {
  export const Container = styled.div``;
}
