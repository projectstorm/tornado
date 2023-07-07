import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import * as _ from 'lodash';
import { Action, CanvasWidget, InputType } from '@projectstorm/react-canvas-core';
import { ConceptBoardModel } from '../../../../stores/ConceptsStore';
import { ConceptCanvasEngine } from './ConceptCanvasEngine';
import { ConceptCanvasModel } from './ConceptCanvasModel';
import { usePasteMedia } from '../../../../hooks/usePasteMedia';
import { useSystem } from '../../../../hooks/useSystem';
import { ImageElement } from './image-element/ImageElementFactory';
import { ButtonType, ButtonWidget } from '../../../../widgets/forms/ButtonWidget';
import { observer } from 'mobx-react';

export interface ConceptCanvasWidgetProps {
  board: ConceptBoardModel;
}

export const ConceptCanvasWidget: React.FC<ConceptCanvasWidgetProps> = observer((props) => {
  const system = useSystem();
  const [engine] = useState(() => {
    return new ConceptCanvasEngine();
  });
  const [position, setPosition] = useState<React.MouseEvent>(null);
  const [ready, setReady] = useState(false);

  // !-------- callbacks ---------

  const setupModel = useCallback((board: ConceptBoardModel) => {
    const model = new ConceptCanvasModel(board);
    model.load(engine);
    engine.setModel(model);
    if (board.data) {
      setReady(true);
    }
  }, []);

  const zoomToFit = useCallback(() => {
    engine.zoomToFitElements({
      elements: _.values(engine.getModel().getLayers()[0].getModels()) as unknown as ImageElement[],
      margin: 0
    });
  }, []);

  // !---------- effects ------

  // load the data
  useEffect(() => {
    let cacheID = props.board.data?.cache_id;
    setupModel(props.board);
    props.board.getCanvasData().then((b) => {
      // looks like the board data changed, or we loaded for the first time
      if (props.board.data?.cache_id !== cacheID) {
        setupModel(props.board);
      }
    });
  }, [props.board]);

  // store last mouse position for when we paste
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

  // initial zoom when ready
  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!props.board.canvasTranslateCache) {
      zoomToFit();
    } else {
      engine.getModel().setOffsetX(props.board.canvasTranslateCache.offsetX);
      engine.getModel().setOffsetY(props.board.canvasTranslateCache.offsetY);
      engine.getModel().setZoomLevel(props.board.canvasTranslateCache.zoom);
      engine.repaintCanvas();
      props.board.canvasTranslateCache = null;
    }
  }, [props.board, ready]);

  // paste handler
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
            engine.getModel().save();
          }
        });
      });
    }
  });

  if (!engine) {
    return null;
  }

  return (
    <S.Parent>
      <S.Container engine={engine} />
      <S.Controls>
        <S.Button
          type={ButtonType.DISCRETE}
          icon="magnifying-glass-minus"
          action={async () => {
            const zoom = engine.getModel().getZoomLevel() - 20;
            if (zoom > 0) {
              engine.getModel().setZoomLevel(zoom);
              engine.repaintCanvas();
            }
          }}
        />
        <S.Button
          type={ButtonType.DISCRETE}
          icon="magnifying-glass-plus"
          action={async () => {
            engine.getModel().setZoomLevel(engine.getModel().getZoomLevel() + 20);
            engine.repaintCanvas();
          }}
        />
        <S.Button
          type={ButtonType.DISCRETE}
          icon="expand"
          action={async () => {
            zoomToFit();
          }}
        />
      </S.Controls>
    </S.Parent>
  );
});

namespace S {
  export const Container = styled(CanvasWidget)`
    width: 100%;
    height: 100%;
  `;

  export const Parent = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
  `;

  export const Controls = styled.div`
    position: absolute;
    right: 15px;
    top: 15px;
  `;

  export const Button = styled(ButtonWidget)`
    margin-left: 5px;
  `;
}
