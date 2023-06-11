import * as express from 'express';
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';
import { setupStaticMiddleware } from './routes/html';
import { ENV } from './Env';

// singletons
const app = express();
const router = express.Router();
const system = new System();

(async () => {
  // configure express top-level
  app.use(express.json());
  app.use('/', router);

  // wait for system to boot
  await system.init();

  // serve authentication
  setupAuthRoutes(router, system);

  // serve index and assets
  await setupStaticMiddleware(app, path.join(__dirname, '../../tornado-frontend/dist-web'));

  // start app
  system.logger.info(`Starting app on port: ${ENV.PORT}`);
  app.listen(ENV.PORT);
})();
