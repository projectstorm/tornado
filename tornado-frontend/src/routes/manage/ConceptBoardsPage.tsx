import * as React from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { TableWidget } from '../../widgets/table/TableWidget';
import { ButtonType, ButtonWidget } from '../../widgets/forms/ButtonWidget';
import { useSystem } from '../../hooks/useSystem';
import { generatePath, useNavigate } from 'react-router-dom';
import { Routing } from '../routes';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

export interface ConceptBoardsPageProps {}

export const ConceptBoardsPage: React.FC<ConceptBoardsPageProps> = observer((props) => {
  useAuthenticated();
  const navigate = useNavigate();
  const system = useSystem();
  useEffect(() => {
    system.conceptStore.loadConcepts();
  }, []);
  return (
    <S.Container>
      <S.Buttons>
        <ButtonWidget
          type={ButtonType.PRIMARY}
          label="Create new"
          icon="plus"
          action={async () => {
            const board = await system.conceptStore.createConcept('Unknown');
            navigate(generatePath(Routing.CONCEPTS_BOARD, { id: `${board.id}` }));
          }}
        />
      </S.Buttons>
      <TableWidget
        columns={[
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'name',
            label: 'Board name'
          }
        ]}
        rows={
          system.conceptStore?.concepts.map((c) => {
            return {
              key: `${c.id}`,
              action: () => {
                navigate(generatePath(Routing.CONCEPTS_BOARD, { id: `${c.id}` }));
              },
              cells: {
                id: `${c.id}`,
                name: c.data.name
              }
            };
          }) || []
        }
      />
    </S.Container>
  );
});
namespace S {
  export const Container = styled.div`
    padding: 50px;
  `;

  export const Buttons = styled.div`
    margin-bottom: 5px;
  `;
}
