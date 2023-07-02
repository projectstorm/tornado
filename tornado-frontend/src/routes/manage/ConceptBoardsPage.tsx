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
    system.updateTitle('Concepts');
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
                  <S.RowButton
                    label="Rename"
                    type={ButtonType.NORMAL}
                    action={async () => {
                      const name = await system.dialogStore.showInputDialog({
                        title: 'Enter a new name',
                        desc: `You are about to rename concept board ${row.board.board.name}`
                      });
                      if (!name) {
                        return;
                      }
                      return row.board.setName(name);
                    }}
                  />
                  <S.RowButton
                    label="Delete"
                    type={ButtonType.NORMAL}
                    action={async () => {
                      const confirm = await system.dialogStore.showConfirmDialog({
                        title: 'Are you sure?',
                        desc: `You are about to delete concept board ${row.board.board.name}`
                      });
                      if (confirm) {
                        return row.board.delete();
                      }
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
                name: c.board.name
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

  export const RowButton = styled(ButtonWidget)`
    margin-right: 5px;

    &:last-of-type {
      margin-right: 0;
    }
  `;
}
