import { Category } from "../../../../domain/entities/category";
import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";
import { GetCategoryUseCase } from "../../get-category.use-case";
import { CategorySequelize } from "#category/infra";
import { setupSequelize } from "#seedwork/infra";

const { CategoryModel, CategoryRepository } = CategorySequelize;
describe("GetCategoryUseCase Integration Tests", () => {
  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a category", async () => {
    const model = await CategoryModel.factory().create();
    const output = await useCase.execute({ id: model.id });
    expect(output).toStrictEqual({
      id: model.id,
      //@ts-ignore
      name: model.name,
      //@ts-ignore
      description: model.description,
      //@ts-ignore
      is_active: model.is_active,
      //@ts-ignore
      created_at: model.created_at,
    });
  });
});
