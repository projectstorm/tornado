import * as React from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { ContentViewWidget } from './widgets/ContentViewWidget';
import { usePasteMedia } from '../../hooks/usePasteMedia';
import { useSystem } from '../../hooks/useSystem';

export interface ConceptBoardPageProps {}

export const ConceptBoardPage: React.FC<ConceptBoardPageProps> = (props) => {
  const system = useSystem();
  useAuthenticated();
  usePasteMedia({
    gotMedia: (files) => {
      files.forEach((file) => {
        system.clientMedia.uploadMedia(file);
      });
    }
  });
  return (
    <S.Container>
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

  export const ContentView = styled(ContentViewWidget)`
    flex-grow: 1;
  `;
}
