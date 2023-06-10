import * as React from 'react';
import styled from '@emotion/styled';

export interface BodyWidgetProps {
  className?: any;
}

export const BodyWidget: React.FC<BodyWidgetProps> = (props) => {
  return <S.Container className={props.className}></S.Container>;
};
namespace S {
  export const Container = styled.div``;
}
