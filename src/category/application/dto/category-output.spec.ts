import { Category } from "../../domain/entities/category";
import { CategoryOutputMapper } from "./category-output";

describe("CategoryOutputMapper unit tests", () => {
  it("should convert a category in output", () => {
    const created_at = new Date();

    const entity = new Category({
      name: "movie",
      description: "some description",
      is_active: true,
      created_at,
    });
    
    const spyToJSON = jest.spyOn(entity, "toJSON");
    const output = CategoryOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: "movie",
      description: "some description",
      is_active: true,
      created_at,
    });
  });
});
