import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSystem } from '../../../../../hooks/useSystem';
import { MediaSize } from '@projectstorm/tornado-common';

export interface ResponseImageWidgetProps {
  id: number;
  className?: any;
}

export const ResponseImageWidget: React.FC<ResponseImageWidgetProps> = (props) => {
  const system = useSystem();
  const [object] = useState(() => {
    return system.clientMedia.getMediaObject(props.id);
  });
  const [url, setUrl] = useState<string>(null);

  useEffect(() => {
    object.getURL(MediaSize.MEDIUM).then(setUrl);
  }, []);

  return <S.Container className={props.className} url={url}></S.Container>;
};
namespace S {
  export const Container = styled.div<{ url: string }>`
    background-image: url('${(p) => p.url}');
    background-repeat: no-repeat;
    background-size: contain;
  `;
}
