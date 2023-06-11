import * as React from 'react';
import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';
import { SignInPage } from '../../routes/welcome/SignInPage';
import { observer } from 'mobx-react';
import { DashboardPage } from '../../routes/manage/DashboardPage';

export interface BodyWidgetProps {
  className?: any;
}

export const BodyWidget: React.FC<BodyWidgetProps> = observer((props) => {
  return (
    <S.Container className={props.className}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </S.Container>
  );
});
namespace S {
  export const Container = styled.div``;
}
