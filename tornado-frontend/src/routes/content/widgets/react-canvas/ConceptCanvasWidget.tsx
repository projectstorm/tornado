import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import * as _ from 'lodash';
import { Action, CanvasWidget, InputType } from '@projectstorm/react-canvas-core';
import { ConceptBoardModel } from '../../../../stores/ConceptsStore';
import { ConceptCanvasEngine } from './ConceptCanvasEngine';
import { ConceptCanvasModel } from './ConceptCanvasModel';
import { usePasteMedia } from '../../../../hooks/usePasteMedia';
import { useSystem } from '../../../../hooks/useSystem';
import { ImageElement } from './image-element/ImageElementFactory';

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

    if (!props.board.canvasTranslateCache) {
      engine.zoomToFitElements({
        maxZoom: 2,
        elements: _.values(model.getLayers()[0].getModels()) as unknown as ImageElement[],
        margin: 10
      });
    } else {
      model.setOffsetX(props.board.canvasTranslateCache.offsetX);
      model.setOffsetY(props.board.canvasTranslateCache.offsetY);
      model.setZoomLevel(props.board.canvasTranslateCache.zoom);
    }
    props.board.canvasTranslateCache = null;
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
