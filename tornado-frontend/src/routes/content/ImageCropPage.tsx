import * as React from 'react';
import { createRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useSystem } from '../../hooks/useSystem';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { MediaSize } from '@projectstorm/tornado-common';
import 'cropperjs/dist/cropper.css';

export const ImageCropPage: React.FC = observer((props) => {
  const system = useSystem();
  useAuthenticated();
  const { board, image } = useParams<{ board: string; image: string }>();

  const [mediaUrl, setMedia] = useState(null);
  useEffect(() => {
    const media = system.clientMedia.getMediaObject(parseInt(image));
    media.getURL(MediaSize.ORIGINAL).then((url) => {
      setMedia(url);
    });
  }, [board, image]);

  const cropperRef = createRef<ReactCropperElement>();

  if (!mediaUrl) {
    return null;
  }

  return (
    <S.Container>
      <Cropper
        ref={cropperRef}
        style={{ height: '100%', width: '100%' }}
        zoomTo={0.5}
        initialAspectRatio={1}
        src={mediaUrl}
        viewMode={2}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        guides={true}
      />
    </S.Container>
  );
});
namespace S {
  export const Container = styled.div`
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
  `;
}
