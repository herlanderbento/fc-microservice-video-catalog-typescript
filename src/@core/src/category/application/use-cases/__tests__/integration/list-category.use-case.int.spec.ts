import { Category } from "../../../../domain/entities/category";
import { CategoryRepository as CategoryRepositoryContract } from "../../../../domain/repository/category.repository";
import { ListCategoriesUseCase } from "../../list-categories.use-case";
import { CategorySequelize } from "#category/infra";
import { setupSequelize } from "#seedwork/infra";
import _chance from "chance";

const { CategoryModel, CategoryModelMapper, CategoryRepository } =
  CategorySequelize;

describe("ListCategoriesUseCase Integration Tests", () => {
  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategorySequelize.CategoryRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategoryRepository(CategoryModel);
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  // it("should return output sorted by created_at when input param is empty", async () => {
  //   const categories = Category.fake()
  //     .theCategories(2)
  //     .withCreatedAt((i) => new Date(new Date().getTime() + 1000 + i))
  //     .build();

  //   await repository.bulkInsert(categories);
  //   const output = await useCase.execute({});
  //   expect(output).toEqual({
  //     items: [...categories].reverse().map((i) => i.toJSON()),
  //     total: 2,
  //     current_page: 1,
  //     per_page: 15,
  //     last_page: 1,
  //   });
  // });

  it("should return output sorted by created_at when input param is empty", async () => {
    const models = await CategoryModel.factory()
      .count(2)
      .bulkCreate((index: number) => {
        const change = _chance();
        return {
          id: change.guid({ version: 4 }),
          name: `category ${index}`,
          description: `some description`,
          is_active: true,
          created_at: new Date(new Date().getTime() + 1000 + index),
        };
      });

    const output = await useCase.execute({});
    expect(output).toMatchObject({
      items: [...models]
        .reverse()
        .map(CategoryModelMapper.toEntity)
        .map((item) => item.toJSON()),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const categories = [
      new Category({ name: "a" }),
      new Category({ name: "AAA" }),
      new Category({ name: "AaA" }),
      new Category({ name: "b" }),
      new Category({ name: "c" }),
    ];

    await repository.bulkInsert(categories);

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });

    expect(output).toStrictEqual({
      items: [categories[1].toJSON(), categories[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });

    expect(output).toStrictEqual({
      items: [categories[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc",
      filter: "a",
    });

    expect(output).toStrictEqual({
      items: [categories[0].toJSON(), categories[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });

  // it("should returns output using pagination, sort and filter", async () => {
  //   const models = CategoryModel.factory().count(5).bulkMake();
  //   models[0].name = "a";
  //   models[0].name = "AAA";
  //   models[0].name = "AaA";
  //   models[0].name = "b";
  //   models[0].name = "c";

  //   await CategoryModel.bulkCreate(models.map((category) => category.toJSON()));
  //   let output = await useCase.execute({
  //     page: 1,
  //     per_page: 2,
  //     sort: "name",
  //     filter: "a",
  //   });

  //   expect(output).toMatchObject({
  //     items: [models[1], models[2]]
  //       .map(CategoryModelMapper.toEntity)
  //       .map((item) => item.toJSON()),
  //     total: 3,
  //     current_page: 1,
  //     per_page: 2,
  //     last_page: 2,
  //   });

  //   // output = await useCase.execute({
  //   //   page: 2,
  //   //   per_page: 2,
  //   //   sort: "name",
  //   //   filter: "a",
  //   // });

  //   // expect(output).toMatchObject({
  //   //   items: [models[0]]
  //   //   .map(CategoryModelMapper.toEntity)
  //   //   .map((item) => item.toJSON()),
  //   //   total: 3,
  //   //   current_page: 2,
  //   //   per_page: 2,
  //   //   last_page: 2,
  //   // });

  //   // output = await useCase.execute({
  //   //   page: 1,
  //   //   per_page: 2,
  //   //   sort: "name",
  //   //   sort_dir: "desc",
  //   //   filter: "a",
  //   // });

  //   // expect(output).toMatchObject({
  //   //   items: [models[0], models[2]]
  //   //   .map(CategoryModelMapper.toEntity)
  //   //   .map((item) => item.toJSON()),
  //   //   total: 3,
  //   //   current_page: 1,
  //   //   per_page: 2,
  //   //   last_page: 2,
  //   // });
  // });
});
