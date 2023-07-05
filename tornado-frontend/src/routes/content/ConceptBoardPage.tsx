import * as React from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { ContentViewWidget } from './widgets/ContentViewWidget';
import { useSystem } from '../../hooks/useSystem';
import { ConceptCanvasWidget } from './widgets/react-canvas/ConceptCanvasWidget';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

export const ConceptBoardPage: React.FC = observer((props) => {
  useAuthenticated();
  const system = useSystem();
  const { board } = useParams<{ board: string }>();
  useEffect(() => {
    system.conceptStore?.loadConcept(parseInt(board)).then((concept) => {
      system.updateTitle(`Concept ${concept.board.name}`);
    });
  }, [board]);

  const concept = system.conceptStore?.getConcept(parseInt(board));
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
