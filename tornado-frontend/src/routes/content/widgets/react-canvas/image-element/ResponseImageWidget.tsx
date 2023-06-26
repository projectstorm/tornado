import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSystem } from '../../../../../hooks/useSystem';
import { MediaSize } from '@projectstorm/tornado-common';
import { ImageElement } from './ImageElementFactory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '../../../../../theme/theme';

export interface ResponseImageWidgetProps {
  className?: any;
  model: ImageElement;
}

export const ResponseImageWidget: React.FC<ResponseImageWidgetProps> = (props) => {
  const system = useSystem();
  const [object] = useState(() => {
    return system.clientMedia.getMediaObject(props.model.imageID);
  });
  const [url, setUrl] = useState<string>(null);
  const [size, setSize] = useState<MediaSize>();

  useEffect(() => {
    const compute = (zoom: number) => {
      if (zoom < 15) {
        setSize(MediaSize.SMALL);
      } else if (zoom >= 15 && zoom < 50) {
        setSize(MediaSize.MEDIUM);
      } else if (zoom >= 50 && zoom < 120) {
        setSize(MediaSize.LARGE);
      } else {
        setSize(MediaSize.ORIGINAL);
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
    if (size) {
      object.getURL(size).then(setUrl);
    }
  }, [size]);

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

  export const Container = styled.div<{ url: string }>`
    background-image: url('${(p) => p.url}');
    background-repeat: no-repeat;
    background-size: contain;
  `;

  export const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(p) => p.theme.editor.stripes};
    border-radius: 5px;
  `;
}
