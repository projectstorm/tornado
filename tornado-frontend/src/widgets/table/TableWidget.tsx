import * as React from 'react';
import { styled } from '../../theme/theme';
import { FONT } from '../../fonts';

export interface TableRow {
  key: string;
  cells: { [key: string]: any };
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
        {props.columns.map((c) => {
          return <S.TH key={c.key}>{c.label}</S.TH>;
        })}
      </thead>
      <tbody>
        {props.rows.map((r) => {
          return (
            <tr key={r.key}>
              {props.columns.map((c) => {
                let value = r[c.key];
                if (c.render) {
                  value = c.render(c, r);
                }
                return <S.TD key={c.key}>{value}</S.TD>;
              })}
            </tr>
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
