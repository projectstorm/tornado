import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { ConceptBoardModel } from '../../../../stores/ConceptsStore';
import { createEngine, createModel } from './utils';

export interface ConceptCanvasWidgetProps {
  board: ConceptBoardModel;
}

export const ConceptCanvasWidget: React.FC<ConceptCanvasWidgetProps> = (props) => {
  const [engine] = useState(() => {
    return createEngine();
  });

  useEffect(() => {
    const model = createModel();
    engine.setModel(model);
  }, [props.board]);

  return <S.Container engine={engine} />;
};
namespace S {
  export const Container = styled(CanvasWidget)`
    width: 100%;
    height: 100%;
  `;
}
