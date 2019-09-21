import { Error as CustomError } from '../../error-handler';

export default class EmailDeliverError extends Error {
  public errors: any;
  public originalError: Error;

  constructor(errors: any, originalError: Error) {
    super('EmailDelivery Error');
    this.errors = errors;
    this.originalError = originalError;

    Object.setPrototypeOf(this, EmailDeliverError.prototype);
  }
}
