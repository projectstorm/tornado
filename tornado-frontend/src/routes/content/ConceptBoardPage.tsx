import * as React from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { ContentViewWidget } from './widgets/ContentViewWidget';
import { usePasteMedia } from '../../hooks/usePasteMedia';
import { useSystem } from '../../hooks/useSystem';
import { ConceptCanvasWidget } from './widgets/react-canvas/ConceptCanvasWidget';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';

export interface ConceptBoardPageProps {}

export const ConceptBoardPage: React.FC<ConceptBoardPageProps> = observer((props) => {
  const system = useSystem();
  const { id } = useParams<{ id: string }>();
  useAuthenticated();
  useEffect(() => {
    system.conceptStore.loadConcepts();
    return autorun(() => {
      const concept = system.conceptStore.getConcept(parseInt(id));
      if (concept) {
        concept.loadData();
      }
    });
  }, [id]);

  const concept = system.conceptStore.getConcept(parseInt(id));
  if (!concept) {
    return null;
  }

  return (
    <S.Container>
      <S.ContentView>
        <ConceptCanvasWidget board={concept} />
      </S.ContentView>
    </S.Container>
  );
});
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
