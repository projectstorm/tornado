import * as React from 'react';
import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

export interface BodyWidgetProps {
  className?: any;
}

export const BodyWidget: React.FC<BodyWidgetProps> = (props) => {
  return (
    <S.Container className={props.className}>
      <Routes>
        <Route path="/" />
      </Routes>
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div``;
}
