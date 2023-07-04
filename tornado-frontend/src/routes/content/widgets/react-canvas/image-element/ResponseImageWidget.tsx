import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSystem } from '../../../../../hooks/useSystem';
import { MediaSize } from '@projectstorm/tornado-common';
import { ImageElement } from './ImageElementFactory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '../../../../../theme/theme';
import { MediaObject } from '../../../../../client/MediaClient';

export interface ResponseImageWidgetProps {
  className?: any;
  model: ImageElement;
}

export const ResponseImageWidget: React.FC<ResponseImageWidgetProps> = (props) => {
  const system = useSystem();
  const [object, setObject] = useState<MediaObject>(null);
  const [url, setUrl] = useState<string>(null);
  const [size, setSize] = useState<MediaSize>();

  useEffect(() => {
    if (!props.model.imageID) {
      return;
    }
    setObject(system.clientMedia.getMediaObject(props.model.imageID));
  }, [props.model.imageID]);

  useEffect(() => {
    const compute = (zoom: number) => {
      if (zoom < 15) {
        setSize(MediaSize.SMALL);
      } else if (zoom >= 15 && zoom < 50) {
        setSize(MediaSize.MEDIUM);
      } else if (zoom >= 50 && zoom < 120) {
        setSize(MediaSize.LARGE);
      } else {
        setSize(MediaSize.X_LARGE);
      }
    };

    compute(props.model.getCanvasModel().getZoomLevel());
    return props.model.getCanvasModel().registerListener({
      zoomUpdated(event) {
        compute(event.zoom);
      }
    }).deregister;
  }, []);

  useEffect(() => {
    if (object && size) {
      object.getURL(size).then(setUrl);
    }
  }, [object, size]);

  if (!url) {
    return (
      <S.Loader className={props.className}>
        <S.Icon icon="spinner" spin={true} />
      </S.Loader>
    );
  }

  return <S.Container className={props.className} url={url}></S.Container>;
};

namespace S {
  export const Icon = styled(FontAwesomeIcon)`
    color: ${(p) => p.theme.text.description};
    font-size: 50px;
  `;

  export const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(p) => p.theme.editor.stripes};
    border-radius: 5px;
    width: 100%;
    height: 100%;
  `;

  export const Container = styled.div<{ url: string }>`
    background-image: url('${(p) => p.url}');
    background-repeat: no-repeat;
    background-size: contain;
  `;
}
