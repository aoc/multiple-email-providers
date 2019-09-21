import { ValidationError } from 'class-validator';

export default class ModelValidationError extends Error {
  public errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('Validation Error');
    this.errors = errors;

    Object.setPrototypeOf(this, ModelValidationError.prototype);
  }
}
