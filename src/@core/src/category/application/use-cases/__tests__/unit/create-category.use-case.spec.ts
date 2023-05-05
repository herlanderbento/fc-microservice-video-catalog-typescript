import { CategoryInMemoryRepository } from "../../../../infra/db/in-memory/category-in-memory.repository";
import { CreateCategoryUseCase } from "../../create-category.use-case";

describe("CreateCategoryUseCase Unit Tests", () => {
  let repository: CategoryInMemoryRepository;
  let useCase: CreateCategoryUseCase.UseCase;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });
  it("should create a category", async () => {
    const spyInsert = jest.spyOn(repository, "insert");
    let output = await useCase.execute({ name: "test" });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: "test",
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: "test",
      description: "some description",
      is_active: false,
      created_at: repository.items[1].created_at,
    });
  });
});
