import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { DataTypes } from "sequelize";

describe('CategoryModel unit tests', () => {
  let sequelize: Sequelize

  beforeAll(() =>
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [CategoryModel]
    }))


  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes()
    const attributes = Object.keys(attributesMap)

    expect(attributes).toStrictEqual(
      [
        'id',
        'name',
        'description',
        'is_active',
        'created_at'
      ]
    )

    const idAtrr = attributesMap.id
    expect(idAtrr).toMatchObject({
      field: 'id',
      fieldName: 'id',
      type: DataTypes.UUID(),
      primaryKey: true
    })
    const nameAtrr = attributesMap.name
    expect(nameAtrr).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataTypes.STRING(255),
    })
    const descriptionAtrr = attributesMap.description
    expect(descriptionAtrr).toMatchObject({
      field: 'description',
      fieldName: 'description',
      allowNull: true,
      type: DataTypes.TEXT(),
    })
    const isActiveAtrr = attributesMap.is_active
    expect(isActiveAtrr).toMatchObject({
      field: 'is_active',
      fieldName: 'is_active',
      allowNull: false,
      type: DataTypes.BOOLEAN(),
    })
    const createdAtAtrr = attributesMap.created_at
    expect(createdAtAtrr).toMatchObject({
      field: 'created_at',
      fieldName: 'created_at',
      allowNull: false,
      type: DataTypes.DATE(),
    })

  })
  test('create category', async () => {
    const arrange = {
      id: '883ae727-31e8-47ae-be70-b287c0f0387f',
      name: 'category',
      is_active: true,
      created_at: new Date(),
    }
    const category = await CategoryModel.create(arrange)
    expect(category.toJSON()).toStrictEqual(arrange)
  });
})