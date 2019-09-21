import { Request, Response, Router } from 'express';
import buildOpenapiDoc from './openapi';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Content-Type', 'application/json');
  res.send(buildOpenapiDoc());
});

export default router;
