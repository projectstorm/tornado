import * as express from 'express';

const app = express();
import * as path from 'path';
import { setupAuthRoutes } from './routes/auth';
import { System } from './System';

const system = new System();

app.use('/', express.static(path.join(__dirname, '../../tornado-frontend/dist-web')));
setupAuthRoutes(app, system);

app.listen(8080);
