import { CategorySequelize } from "../category-sequelize";
import { DataTypes } from "sequelize";
import { setupSequelize } from "#seedwork/infra";

describe('CategoryModel unit tests', () => {
  setupSequelize({ models: [CategorySequelize.CategoryModel] })

  test("mapping props", () => {
    const attributesMap = CategorySequelize.CategoryModel.getAttributes()
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
    const category = await CategorySequelize.CategoryModel.create(arrange)
    expect(category.toJSON()).toStrictEqual(arrange)
  });
})