import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";

describe("UniqueEntityID Unit tests", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const uuid = "42f2da51-4b6d-4c29-b6d4-f255ed60fb96";
    const valueObject = new UniqueEntityId(uuid);
    expect(valueObject.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const valueObject = new UniqueEntityId();
    expect(uuidValidate(valueObject.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
