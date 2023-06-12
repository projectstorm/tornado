import * as React from 'react';
import { styled } from '../../theme/theme';
import { FONT } from '../../fonts';

export interface TableRow {
  key: string;
  cells: { [key: string]: any };
  action?: () => any;
}

export interface TableColumn<T extends TableRow> {
  key: string;
  label: string;
  render?: (cell: any, row: T) => JSX.Element | string;
}

export interface TableWidgetProps<T extends TableRow> {
  columns: TableColumn<T>[];
  rows: T[];
  className?: any;
}

export const TableWidget = <T extends TableRow>(props: TableWidgetProps<T>) => {
  return (
    <S.Table className={props.className}>
      <thead>
        <tr>
          {props.columns.map((c) => {
            return <S.TH key={c.key}>{c.label}</S.TH>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((r) => {
          return (
            <S.TR
              key={r.key}
              onClick={() => {
                r.action?.();
              }}
            >
              {props.columns.map((c) => {
                let value = r.cells[c.key];
                if (c.render) {
                  value = c.render(value, r);
                }
                return <S.TD key={c.key}>{value}</S.TD>;
              })}
            </S.TR>
          );
        })}
      </tbody>
    </S.Table>
  );
};
namespace S {
  export const Table = styled.table`
    border: 0;
    border-spacing: 0;
    width: 100%;
  `;

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

  export const TH = styled.th`
    color: ${(p) => p.theme.text.heading};
    padding: 5px;
    border-bottom: solid 1px ${(p) => p.theme.layout.separatorLine};
    text-align: left;
    ${FONT}
  `;

  export const TD = styled.td`
    color: ${(p) => p.theme.text.description};
    padding: 5px;
    text-align: left;
    ${FONT}
  `;
}
