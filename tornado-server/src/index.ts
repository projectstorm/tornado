import * as express from 'express';
const app = express();
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';

const system = new System();

(async () => {
  await system.init();

  var router = express.Router();
  app.use(express.json());
  app.use('/', router);
  app.use(
    '/',
    (req, res, next) => {
      console.log(req.user);
      next();
    },
    express.static(path.join(__dirname, '../../tornado-frontend/dist-web'))
  );
  setupAuthRoutes(router, system);

  app.listen(8080);
})();
