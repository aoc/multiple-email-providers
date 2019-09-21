import { Request, Response, NextFunction } from 'express';
import ModelValidationError from './common/errors/ModelValidationError';
import logger from './common/logger';
import HttpStatus from 'http-status-codes';
import { ValidationError } from 'class-validator';
import ConfigError from './common/errors/ConfigError';
import { ServiceResponseStatus } from './common/ServiceResponse';

export enum ErrorCode {
  VALIDATION_ERROR = 'validation-error',
  EMAIL_PROVIDER_ERROR = 'email-provider-error',
  UNEXPECTED_ERROR = 'unexpected_error'
}

export interface Error {
  code: ErrorCode;
  detail?: string | string[];
  source?: string;
}

class ErrorResponseBuilder {
  private errors: Error[] = [];

  public addError(
    code: ErrorCode,
    detail?: string | string[],
    source?: string
  ): ErrorResponseBuilder {
    this.errors.push({ code, detail, source });
    return this;
  }

  public build() {
    return { status: ServiceResponseStatus.ERROR, errors: this.errors };
  }
}

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const httpStatus = HttpStatus.BAD_REQUEST;
  const erb = new ErrorResponseBuilder();

  if (error instanceof ModelValidationError) {
    logger.debug(error.message, error.stack);

    error.errors.map((validationError: ValidationError) => {
      erb.addError(
        ErrorCode.VALIDATION_ERROR,
        Object.values(validationError.constraints),
        validationError.property
      );
    });
  } else if (error instanceof ConfigError) {
    process.exit(-1);
  } else {
    logger.error(error.message, error.stack);
    erb.addError(ErrorCode.UNEXPECTED_ERROR);
  }

  res.status(httpStatus).json(erb.build());
};

export default errorHandler;
