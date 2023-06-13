import * as React from 'react';
import { styled } from '../../theme/theme';
import { FONT } from '../../fonts';
import { TableRowWidget } from './TableRowWidget';

export interface TableRow {
  key: string;
  cells: { [key: string]: any };
  action?: () => any;
}

export interface TableCellRenderEvent<T extends TableRow> {
  cell: any;
  row: T;
  rowHover: boolean;
}

export interface TableColumn<T extends TableRow> {
  key: string;
  label: string;
  render?: (event: TableCellRenderEvent<T>) => React.JSX.Element | string;
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
          return <TableRowWidget row={r} key={r.key} columns={props.columns} />;
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

  export const TR = styled.tr``;

  export const TH = styled.th`
    color: ${(p) => p.theme.text.heading};
    padding: 5px;
    border-bottom: solid 1px ${(p) => p.theme.layout.separatorLine};
    text-align: left;
    ${FONT}
  `;
}
