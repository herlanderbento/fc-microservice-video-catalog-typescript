import ValueObject from "../../../../dist/@seedwork/domain/value-objects/value-object";
import { Either } from "../../../@seedwork/domain/utils/either";
import { InvalidCastMemberTypeError } from "../errors/invalid-cast-member-type.error";

enum Types {
  DIRECTOR = 1,
  ACTOR = 2,
}

class CastMemberType extends ValueObject<Types> {
  private constructor(value: Types) {
    super(value);
    this.validate();
  }

  public static create(
    value: Types
  ): Either<CastMemberType, InvalidCastMemberTypeError> {
    try {
      return Either.ok(new CastMemberType(value));
    } catch (error) {
      return Either.fail(error);
    }
  }

  private validate() {
    const invalid = this.value === Types.DIRECTOR || this.value === Types.ACTOR;

    if (!invalid) {
      throw new InvalidCastMemberTypeError(this.value);
    }
  }

  public static createAnActor() {
    return CastMemberType.create(Types.ACTOR).getOk();
  }

  public static createADirector() {
    return CastMemberType.create(Types.DIRECTOR).getOk();
  }
}

export { CastMemberType, Types };
