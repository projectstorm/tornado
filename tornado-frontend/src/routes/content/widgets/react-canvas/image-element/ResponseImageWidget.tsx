import * as React from 'react';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { useSystem } from '../../../../../hooks/useSystem';
import { MEDIA_SIZES, MediaSize } from '@projectstorm/tornado-common';
import { ImageElement } from './ImageElementFactory';
import { styled } from '../../../../../theme/theme';
import { MediaObject } from '../../../../../client/MediaClient';
import { keyframes } from '@emotion/react';

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
    const compute = () => {
      const zoom = props.model.getCanvasModel().getZoomLevel() / 100;
      const width = zoom * props.model.width * window.devicePixelRatio;
      const height = zoom * props.model.height * window.devicePixelRatio;

      // this is the final value we need to check
      const length = Math.max(width, height);

      const keys = _.keys(MEDIA_SIZES) as unknown as MediaSize[];

      if (length < MEDIA_SIZES[keys[0]]) {
        return setSize(keys[0]);
      }

      for (let i = 1; i < keys.length; i++) {
        if (length >= MEDIA_SIZES[keys[i - 1]] && length < MEDIA_SIZES[keys[i]]) {
          return setSize(keys[i]);
        }
      }

      setSize(MediaSize.X_LARGE);
    };

    compute();

    const l1 = props.model.getCanvasModel().registerListener({
      zoomUpdated(event) {
        compute();
      }
    }).deregister;

    const l2 = props.model.registerListener({
      sizeUpdated: () => {
        compute();
      }
    }).deregister;

    return () => {
      l1?.();
      l2?.();
    };
  }, []);

  useEffect(() => {
    if (object && size) {
      object.getURL(size).then(setUrl);
    }
  }, [object, size]);

  if (!url) {
    return <S.Loader delay={Math.round(Math.random() * 300)} className={props.className}></S.Loader>;
  }

  return <S.Container className={props.className} url={url}></S.Container>;
};

namespace S {
  export const Animated = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

  export const Loader = styled.div<{ delay: number }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(p) => p.theme.editor.stripes};
    border-radius: 5px;
    width: 100%;
    height: 100%;
    animation: ${Animated} 1s infinite alternate-reverse;
    animation-delay: ${(p) => p.delay}ms;
  `;

  export const Container = styled.div<{ url: string }>`
    background-image: url('${(p) => p.url}');
    background-repeat: no-repeat;
    background-size: contain;
  `;
}
