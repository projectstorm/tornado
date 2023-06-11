import * as express from 'express';

const app = express();
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';
import { application } from 'express';
import { setupStaticMiddleware } from './routes/html';

const system = new System();

(async () => {
  const router = express.Router();
  app.use(express.json());
  app.use('/', router);

  // wait for system to boot
  await system.init();

  // create the routes

  setupAuthRoutes(router, system);

  await setupStaticMiddleware(app, path.join(__dirname, '../../tornado-frontend/dist-web'));

  system.logger.info('Starting app!');
  // start app
  app.listen(8080);
})();
