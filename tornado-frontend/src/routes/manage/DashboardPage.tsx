import * as React from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';

export interface DashboardPageProps {}

export const DashboardPage: React.FC<DashboardPageProps> = (props) => {
  useAuthenticated();

  return <S.Container></S.Container>;
};
namespace S {
  export const Container = styled.div``;
}
