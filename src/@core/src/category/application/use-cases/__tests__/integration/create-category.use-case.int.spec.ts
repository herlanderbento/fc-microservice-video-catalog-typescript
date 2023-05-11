import { CategorySequelize } from "#category/infra";
import { setupSequelize } from "#seedwork/infra";
import { CreateCategoryUseCase } from "../../create-category.use-case";

const { CategoryModel, CategoryRepository } = CategorySequelize;

describe("CreateCategoryUseCase Integration Tests", () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  // describe("test with test.each", () => {
  //   const arrange = [
  //     {
  //       inputProps: { name: "test" },
  //       outputProps: {
  //         name: "test",
  //         description: null,
  //         is_active: true,
  //       },
  //     },
  //     {
  //       inputProps: {
  //         name: "test",
  //         description: "some description",
  //         is_active: false,
  //       },
  //       outputProps: {
  //         name: "test",
  //         description: "some description",
  //         is_active: false,
  //       },
  //     },
  //   ];

  //   test.each(arrange)(
  //     "should create category with input $inputProps, output $outputProps",
  //     async ({ inputProps, outputProps }) => {
  //       let output = await useCase.execute(inputProps);
  //       let entity = await repository.findById(output.id);
  //       expect(entity.id).toBe(output.id);
  //       expect(entity.created_at).toStrictEqual(output.created_at);
  //       expect(output).toMatchObject(outputProps);
  //     }
  //   );
  // });
  it("should create a category", async () => {
    let output = await useCase.execute({ name: "test" });
    let entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
      is_active: false,
    });
    entity = await repository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: "some description",
      is_active: false,
      created_at: entity.created_at,
    });
  });
});
