import { Request, Response, Router } from 'express';
import config from '../common/config';

const router = Router();

router.get('/health', (req: Request, res: Response) =>
  res.json({ status: 'ok' })
);

router.get('/config', (req: Request, res: Response) => {
  const configCopy = {
    ...config,
    emailProviders: config.emailProviders.map(emailProvider => ({
      id: emailProvider.id
    }))
  };
  res.json(configCopy);
});

export default router;
