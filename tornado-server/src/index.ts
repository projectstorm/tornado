import * as express from 'express';

const app = express();
import * as path from 'path';

app.use('/', express.static(path.join(__dirname, '../../tornado-frontend/dist-web')));

app.listen(8080);
