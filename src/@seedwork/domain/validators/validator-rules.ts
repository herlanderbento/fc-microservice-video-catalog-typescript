import { ValidationError } from "../errors/validation-error";

export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  public static values(value: any, property: string): ValidatorRules {
    return new ValidatorRules(value, property);
  }

  public required(): Omit<this, "required"> {
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`The ${this.property} is required`);
    }
    return this;
  }

  public string(): Omit<this, "string"> {
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new ValidationError(`The ${this.property} must be a string`);
    }
    return this;
  }

  public maxLength(max: number): Omit<this, "maxLength"> {
    if (this.value.length > max) {
      throw new ValidationError(
        `The ${this.property} must be less or equal than ${max} characters`
      );
    }
    return this;
  }

  public boolean(): Omit<this, "boolean"> {
    if (!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new ValidationError(`The ${this.property} must be a boolean`);
    }
    return this;
  }
}

export function isEmpty(value: any): boolean {
  return value === undefined || value === null;
}
