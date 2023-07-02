import * as React from 'react';
import { createRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useSystem } from '../../hooks/useSystem';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { MediaSize } from '@projectstorm/tornado-common';
import 'cropperjs/dist/cropper.css';
import { ButtonType, ButtonWidget } from '../../widgets/forms/ButtonWidget';
import { Routing } from '../routes';
import * as _ from 'lodash';

export const ImageCropPage: React.FC = observer((props) => {
  const system = useSystem();
  useAuthenticated();
  const navigate = useNavigate();
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
      <S.Buttons>
        <S.Button
          type={ButtonType.NORMAL}
          label="Cancel"
          action={async () => {
            navigate(generatePath(Routing.CONCEPTS_BOARD, { board: board }));
          }}
        />
        <S.Button
          type={ButtonType.PRIMARY}
          label="Crop"
          action={async () => {
            const data = cropperRef.current.cropper.getData();
            await system.client.mediaCrop({
              image: parseInt(image),
              top: data.y,
              left: data.x,
              width: data.width,
              height: data.height
            });

            // clear the URL caches
            system.clientMedia.getMediaObject(parseInt(image)).clearCachesSizes();

            // update the image sizes on the board
            const concept = await system.conceptStore.loadConcept(parseInt(board));
            _.forEach(concept.board.data.layers[0].models, (m) => {
              if (m.image_id === parseInt(image)) {
                m.height = (m.width / data.width) * data.height;
              }
            });
            await concept.setCanvasData(concept.board.data);
            navigate(generatePath(Routing.CONCEPTS_BOARD, { board: board }));
          }}
        />
      </S.Buttons>
      <S.Crop
        ref={cropperRef}
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
    display: flex;
    flex-direction: column;
  `;

  export const Buttons = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: flex-end;
    display: flex;
  `;

  export const Button = styled(ButtonWidget)`
    margin-left: 5px;
  `;

  export const Crop = styled(Cropper)`
    height: 100%;
    width: 100%;
    flex-grow: 1;
  `;
}
