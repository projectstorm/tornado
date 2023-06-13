import * as React from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { TableRow, TableWidget } from '../../widgets/table/TableWidget';
import { ButtonType, ButtonWidget } from '../../widgets/forms/ButtonWidget';
import { useSystem } from '../../hooks/useSystem';
import { generatePath, useNavigate } from 'react-router-dom';
import { Routing } from '../routes';
import { observer } from 'mobx-react';
import { TableRowActionsWidget } from '../../widgets/table/TableRowActionsWidget';
import { ConceptBoardModel } from '../../stores/ConceptsStore';

export interface ConceptBoardRow extends TableRow {
  board: ConceptBoardModel;
}

export const ConceptBoardsPage: React.FC = observer((props) => {
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
      <TableWidget<ConceptBoardRow>
        columns={[
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'name',
            label: 'Board name'
          },
          {
            key: 'actions',
            label: 'Actions',
            render: ({ rowHover, row }) => {
              return (
                <TableRowActionsWidget show={rowHover}>
                  <ButtonWidget
                    label="Delete"
                    type={ButtonType.NORMAL}
                    action={() => {
                      return row.board.delete();
                    }}
                  />
                </TableRowActionsWidget>
              );
            }
          }
        ]}
        rows={
          system.conceptStore?.concepts.map((c) => {
            return {
              key: `${c.id}`,
              board: c,
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
