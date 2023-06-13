import * as React from 'react';
import { TableColumn, TableRow } from './TableWidget';
import { FONT } from '../../fonts';
import { styled } from '../../theme/theme';
import { useState } from 'react';

export interface TableRowWidgetProps<T extends TableRow> {
  columns: TableColumn<T>[];
  row: T;
}

export const TableRowWidget = <T extends TableRow>(props: TableRowWidgetProps<T>) => {
  const r = props.row;
  const [hover, setHover] = useState(false);
  return (
    <S.TR
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      key={r.key}
      onClick={() => {
        r.action?.();
      }}
    >
      {props.columns.map((c) => {
        let value = r.cells[c.key];
        if (c.render) {
          value = c.render({
            cell: value,
            row: r,
            rowHover: hover
          });
        }
        return <S.TD key={c.key}>{value}</S.TD>;
      })}
    </S.TR>
  );
};
namespace S {
  export const TR = styled.tr`
    cursor: pointer;

    td {
      background: ${(p) => p.theme.table.row.background};
    }

    &:hover {
      td {
        background: ${(p) => p.theme.table.row.backgroundHover};
      }
    }
  `;

  export const TD = styled.td`
    color: ${(p) => p.theme.text.description};
    padding: 5px;
    text-align: left;
    ${FONT}
  `;
}
