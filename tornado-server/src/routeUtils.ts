import { User } from '@prisma/client';
import { Routes } from '@projectstorm/tornado-common';
import { Response, Router } from 'express';
import { System } from './System';

export interface ApiEvent<T> {
  data: T;
  user: User;
  response: Response;
}

export interface CreateAuthenticatedApi<Req, Res> {
  router: Router;
  route: Routes;
  system: System;
  cb: (event: ApiEvent<Req>) => Promise<Res>;
}

export const createApiRoute = <Req, Res = any>(options: CreateAuthenticatedApi<Req, Res>) => {
  options.router.post(options.route, async (req, res) => {
    const user = await options.system.db.user.findFirst({
      where: {
        id: req.user.id
      }
    });
    if (!user) {
      return res.status(500);
    }
    options.system.logger.debug(`api -> ${options.route} for user ${user.id}`);
    const resObject = await options.cb({
      user: user,
      data: req.body as Req,
      response: res
    });
    if (resObject) {
      res.json(resObject);
    }
    res.status(200);
  });
};
