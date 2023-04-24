import { Category } from "../../../../domain/entities/category";
import { CategoryInMemoryRepository } from "../../../../infra/repository/category-in-memory.repository";
import { NotFoundError } from "../../../../../@seedwork/domain/errors/not-found.error";
import { GetCategoryUseCase } from "../../get-category.use-case";
describe("GetCategoryUseCase Unit Tests", () => {
  let repository: CategoryInMemoryRepository;
  let useCase: GetCategoryUseCase.UseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );
  });

  it("should returns a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.items = items;
    const spyFindById = jest.spyOn(repository, "findById");
    const output = await useCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Movie",
      description: null,
      is_active: true,
      created_at: items[0].created_at,
    });
  });
});
