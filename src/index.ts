import express from 'express';
import bodyParser from 'body-parser';
import config from './common/config';
import log, { initLogger } from './common/logger';
import routes from './routes';
import { registerEmailProviders } from './email/service';

const app = express();
initLogger(app);
registerEmailProviders();
app.use(bodyParser.json());
app.use('/', routes);

export const server = app.listen(config.serverPort, () => {
  log.info(`server started at http://localhost:${config.serverPort}`);
});

export default app;
