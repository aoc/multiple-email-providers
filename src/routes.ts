import express from 'express';
import apiDocsRoutes from './api-docs/routes';
import emailRoutes from './email/routes';
import statusRoutes from './status/routes';
import errorHandler from './error-handler';
import HttpStatus from 'http-status-codes';

const router = express.Router();

router.use('/email', emailRoutes);
router.use('/status', statusRoutes);
router.use('/api-docs', apiDocsRoutes);
router.all('*', (req: express.Request, res: express.Response) =>
  res.status(HttpStatus.NOT_FOUND).end()
);
router.use(errorHandler);

export default router;
