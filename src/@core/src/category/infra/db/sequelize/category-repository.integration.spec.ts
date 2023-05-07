import { Sequelize } from "sequelize-typescript"
import { CategoryModel } from "./category-model"
import { Category } from "#category/domain";
import { CategoryRepository } from "./category-sequelize";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
describe("CategoryRepository integration tests", () => {
  let sequelize: Sequelize
  let repository: CategoryRepository

  beforeAll(() =>
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [CategoryModel]
    }))


  beforeEach(async () => {
    repository = new CategoryRepository(CategoryModel)
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should inserts a new category", async () => {
    let category = new Category({ name: "Movie" });
    await repository.insert(category);
    let entity = await CategoryModel.findByPk(category.id);
    expect(entity.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    await repository.insert(category);
    entity = await CategoryModel.findByPk(category.id);
    expect(entity.toJSON()).toStrictEqual(category.toJSON());
  })

  it("should throws error when entity is not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    );

    await expect(
      repository.findById(
        new UniqueEntityId("025a9698-d6a6-43fa-943f-3a2b21b6709a")
      )
    ).rejects.toThrow(
      new NotFoundError(
        "Entity Not Found using ID 025a9698-d6a6-43fa-943f-3a2b21b6709a"
      )
    );
  })

  it("should finds a entity by id", async () => {
    const entity = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(
      new UniqueEntityId(entity.id)
    );
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  })
})