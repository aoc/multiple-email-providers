import got, { GotInstance, GotFn } from 'got';
import config from './config';

const httpClient = got.extend({
  timeout: config.http.req.timeout
});

export default httpClient as GotInstance<GotFn>;
