import * as React from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { TableWidget } from '../../widgets/table/TableWidget';
import { ButtonType, ButtonWidget } from '../../widgets/forms/ButtonWidget';

export interface ConceptBoardsPageProps {}

export const ConceptBoardsPage: React.FC<ConceptBoardsPageProps> = (props) => {
  useAuthenticated();
  return (
    <S.Container>
      <S.Buttons>
        <ButtonWidget type={ButtonType.PRIMARY} label="Create new" icon="plus" action={async () => {}} />
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
        rows={[]}
      />
    </S.Container>
  );
};
namespace S {
  export const Container = styled.div`
    padding: 50px;
  `;

  export const Buttons = styled.div`
    margin-bottom: 5px;
  `;
}
