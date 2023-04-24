import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";
import InvalidUuidError from "../errors/invalid-uuid.error";

export class UniqueEntityId extends ValueObject<string> {
  public constructor(public readonly id?: string) {
    super(id || uuidV4());
    this.validate();
  }

  private validate(): void {
    const isValid: boolean = uuidValidate(this.value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}

export default UniqueEntityId;
