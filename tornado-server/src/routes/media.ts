import { Router } from 'express';
import { System } from '../System';
import { GetMediaRequest, MediaCropRequest, Routes } from '@projectstorm/tornado-common';
import { createApiRoute } from '../routeUtils';

export const setupMediaRoutes = (router: Router, system: System) => {
  createApiRoute<Buffer, any>({
    router,
    system,
    route: Routes.UPLOAD_MEDIA,
    cb: async ({ user, data }) => {
      return system.media.uploadFile(user, data);
    }
  });

  createApiRoute<GetMediaRequest, any>({
    router,
    system,
    route: Routes.MEDIA_GET,
    cb: async ({ data, response }) => {
      const path = await system.media.getMediaPath(data.image, data.size);
      response.sendFile(path);
    }
  });

  createApiRoute<MediaCropRequest, any>({
    router,
    system,
    route: Routes.MEDIA_CROP,
    cb: async ({ data }) => {
      await system.media.cropMedia(data);
      return {};
    }
  });
};
