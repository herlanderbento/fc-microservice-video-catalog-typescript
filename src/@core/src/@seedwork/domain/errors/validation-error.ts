import { FieldsErrors } from "../validators/validator-fields-interface";

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  public constructor(public error: FieldsErrors) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
