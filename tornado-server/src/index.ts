import * as express from 'express';
const app = express();
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';
import * as session from 'express-session';

const system = new System();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  })
);

app.use('/', express.static(path.join(__dirname, '../../tornado-frontend/dist-web')));

setupAuthRoutes(app, system);

(async () => {
  await system.init();
  app.listen(8080);
})();
