import * as express from 'express';
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';
import { setupStaticMiddleware } from './routes/html';
import { ENV } from './Env';
import { setupConceptRoutes } from './routes/concepts';
import { setupMediaRoutes } from './routes/media';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';

// singletons
const app = express();
const router = express.Router();
const system = new System();

const rootPackage = require(path.join(__dirname, '../../package.json')) as { version: string };

(async () => {
  // configure express top-level
  app.use(compression());
  app.use(express.json());
  app.use(
    bodyParser.raw({
      limit: ENV.UPLOAD_LIMIT
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
    version: rootPackage.version,
    siteUrl: ENV.SITE_URL,
    staticPath: path.join(__dirname, '../../tornado-frontend/dist-web')
  });

  // start app
  system.logger.info(`Starting app on port: ${ENV.PORT}`);
  app.listen(ENV.PORT);
})();
