import { Router } from 'express';
import { System } from '../System';
import { Routes } from '@projectstorm/tornado-common';
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
};
