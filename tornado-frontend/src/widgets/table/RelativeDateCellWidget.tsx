import * as React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { useForceUpdate } from '../../hooks/useForceUpdate';

export interface RelativeDateCellWidgetProps {
  date: string;
}

export const RelativeDateCellWidget: React.FC<RelativeDateCellWidgetProps> = (props) => {
  const l = DateTime.fromISO(props.date);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    const res = setInterval(() => {
      forceUpdate();
    }, 5000);
    return () => {
      clearInterval(res);
    };
  }, []);

  return (
    <>
      {l.toLocaleString(DateTime.DATETIME_SHORT)}
      <S.Rel>{l.toRelative()}</S.Rel>
    </>
  );
};
namespace S {
  export const Rel = styled.span`
    opacity: 0.5;
    padding-left: 10px;
    font-size: 12px;
  `;
}
