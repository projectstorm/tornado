import { Router } from 'express';
import { System } from '../System';
import { GetMediaRequest, Routes } from '@projectstorm/tornado-common';
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
    route: Routes.GET_MEDIA,
    cb: async ({ data, response }) => {
      const path = await system.media.getMediaPath(data.image, data.size);
      response.sendFile(path);
    }
  });
};
