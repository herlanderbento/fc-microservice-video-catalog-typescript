import { FieldsErrors } from "../validators";

export class LoadEntityError extends Error {
  public constructor(public error: FieldsErrors, message?: string) {
    super(message ?? 'An entity not be loaded');
    this.name = 'LoadEntityError';
  }
}

export default LoadEntityError;
