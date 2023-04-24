import { Category } from "../../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../../infra/repository/category-in-memory.repository";
import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";
import { DeleteCategoryUseCase } from "../../delete-category.use-cases";
describe("DeleteCategoryUseCase Unit Tests", () => {
  let repository: CategoryInMemoryRepository;
  let useCase: DeleteCategoryUseCase.UseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "test 1" })];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
