import * as React from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { SidebarWidget } from './widgets/SidebarWidget';
import { ContentViewWidget } from './widgets/ContentViewWidget';

export interface ConceptBoardPageProps {}

export const ConceptBoardPage: React.FC<ConceptBoardPageProps> = (props) => {
  useAuthenticated();
  return (
    <S.Container>
      <S.Sidebar />
      <S.ContentView />
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    display: flex;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
  `;

  export const Sidebar = styled(SidebarWidget)`
    width: 200px;
    flex-shrink: 0;
  `;

  export const ContentView = styled(ContentViewWidget)`
    flex-grow: 1;
  `;
}
