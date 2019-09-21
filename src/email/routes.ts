import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { fromRequest } from './email';
import HttpStatus from 'http-status-codes';
import { sendEmail } from './service';
import { ServiceResponseStatus } from '../common/ServiceResponse';

const router = Router();

router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const email = await fromRequest(req.body);
    const response = await sendEmail(email);

    res
      .status(
        response.status === ServiceResponseStatus.SUCCESS
          ? HttpStatus.OK
          : HttpStatus.BAD_REQUEST
      )
      .json(response);
  })
);

export default router;
