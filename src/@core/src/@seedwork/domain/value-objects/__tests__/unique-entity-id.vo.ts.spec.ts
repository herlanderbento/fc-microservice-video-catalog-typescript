import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "./../unique-entity-id.vo";
import InvalidUuidError from "../../../../@seedwork/domain/errors/invalid-uuid.error";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityID Unit tests", () => {
  const validateSpy = spyValidateMethod();
  it("should throw error when uuid is invalid", () => {
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "42f2da51-4b6d-4c29-b6d4-f255ed60fb96";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should throw error when uuid is invalid", () => {
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
