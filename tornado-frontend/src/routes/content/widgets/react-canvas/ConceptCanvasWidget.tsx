import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Action, CanvasWidget, InputType } from '@projectstorm/react-canvas-core';
import { ConceptBoardModel } from '../../../../stores/ConceptsStore';
import { ConceptCanvasEngine } from './ConceptCanvasEngine';
import { ConceptCanvasModel } from './ConceptCanvasModel';
import { usePasteMedia } from '../../../../hooks/usePasteMedia';
import { useSystem } from '../../../../hooks/useSystem';

export interface ConceptCanvasWidgetProps {
  board: ConceptBoardModel;
}

export const ConceptCanvasWidget: React.FC<ConceptCanvasWidgetProps> = (props) => {
  const system = useSystem();
  const [engine] = useState(() => {
    return new ConceptCanvasEngine();
  });
  const [position, setPosition] = useState<React.MouseEvent>(null);

  usePasteMedia({
    gotMedia: (files) => {
      files.forEach(async (file) => {
        const media = await system.clientMedia.uploadMedia(file);
        const element = engine.getModel().addImage();
        if (position) {
          element.setPosition(engine.getRelativeMousePoint(position));
        }
        engine.repaintCanvas();
        media.registerListener({
          finished: (data) => {
            element.update(data);
            engine.repaintCanvas();
          }
        });
      });
    }
  });

  useEffect(() => {
    return engine.getActionEventBus().registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: ({ event }) => {
          setPosition(event as React.MouseEvent);
        }
      })
    );
  });

  useEffect(() => {
    const model = new ConceptCanvasModel(props.board);
    model.load(engine);
    engine.setModel(model);
  }, [props.board]);

  if (!engine) {
    return null;
  }

  return <S.Container engine={engine} />;
};
namespace S {
  export const Container = styled(CanvasWidget)`
    width: 100%;
    height: 100%;
  `;
}
