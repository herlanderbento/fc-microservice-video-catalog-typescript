import { CastMemberType, Types } from "./cast-member-type.vo";
import { InvalidCastMemberTypeError } from "../errors/invalid-cast-member-type.error";

describe("CastMemberType Unit Tests", () => {
  const validateSpy = jest.spyOn(CastMemberType.prototype as any, "validate");

  it("should return error when type is invalid", () => {
    let [valueObject, error] = CastMemberType.create("1" as any);
    expect(valueObject).toBeNull();
    expect(error).toEqual(new InvalidCastMemberTypeError("1"));
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  it("should create a director", () => {
    let [valueObject, error] = CastMemberType.create(Types.DIRECTOR);
    expect(error).toBeNull();
    expect(valueObject).toBeInstanceOf(CastMemberType);
    expect(valueObject.value).toBe(Types.DIRECTOR);

    valueObject = CastMemberType.createAnDirector()
    expect(error).toBeNull();
    expect(valueObject).toBeInstanceOf(CastMemberType);
    expect(valueObject.value).toBe(Types.DIRECTOR);
  });

  it("should create a actor", () => {
    let [valueObject, error] = CastMemberType.create(Types.ACTOR);
    expect(error).toBeNull();
    expect(valueObject).toBeInstanceOf(CastMemberType);
    expect(valueObject.value).toBe(Types.ACTOR);

    valueObject = CastMemberType.createAnActor()
    expect(error).toBeNull();
    expect(valueObject).toBeInstanceOf(CastMemberType);
    expect(valueObject.value).toBe(Types.ACTOR);
  });
});
