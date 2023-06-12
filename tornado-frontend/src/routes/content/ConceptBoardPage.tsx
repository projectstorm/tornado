import * as React from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';

export interface ConceptBoardPageProps {}

export const ConceptBoardPage: React.FC<ConceptBoardPageProps> = (props) => {
  useAuthenticated();
  return <S.Container></S.Container>;
};
namespace S {
  export const Container = styled.div``;
}
