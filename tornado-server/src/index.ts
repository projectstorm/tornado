import * as express from 'express';
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';
import { setupStaticMiddleware } from './routes/html';
import { ENV } from './Env';
import { setupConceptRoutes } from './routes/concepts';
import { setupMediaRoutes } from './routes/media';
import * as bodyParser from 'body-parser';
// singletons
const app = express();
const router = express.Router();
const system = new System();

(async () => {
  // configure express top-level
  app.use(express.json());
  app.use(
    bodyParser.raw({
      limit: '10MB'
    })
  );
  app.use('/', router);

  // wait for system to boot
  await system.init();

  // serve authentication
  setupAuthRoutes(router, system);
  setupConceptRoutes(router, system);
  setupMediaRoutes(router, system);

  // serve index and assets
  await setupStaticMiddleware({
    app,
    siteUrl: ENV.SITE_URL,
    staticPath: path.join(__dirname, '../../tornado-frontend/dist-web')
  });

  // start app
  system.logger.info(`Starting app on port: ${ENV.PORT}`);
  app.listen(ENV.PORT);
})();
