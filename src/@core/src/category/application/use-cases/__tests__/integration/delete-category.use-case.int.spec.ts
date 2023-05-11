import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";
import { DeleteCategoryUseCase } from "../../delete-category.use-cases";
import { CategorySequelize } from "#category/infra";
import { setupSequelize } from "#seedwork/infra";

const { CategoryModel, CategoryRepository } = CategorySequelize;

describe("DeleteCategoryUseCase Integration Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const model = await CategoryModel.factory().create();
    await useCase.execute({
      id: model.id,
    });
    const noHasModel = await CategoryModel.findByPk(model.id);
    expect(noHasModel).toBeNull();
  });
});
