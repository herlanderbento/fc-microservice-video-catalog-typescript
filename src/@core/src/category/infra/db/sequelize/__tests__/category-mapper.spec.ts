import { CategoryRepository } from "../category-sequelize"
import { CategoryModel } from "../category-model"
import { CategoryModelMapper } from "../category-mapper"
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain"
import { setupSequelize } from "#seedwork/infra"
import { Category } from "#category/domain"

describe("CategoryModelMapper", () => {
  setupSequelize({ models: [CategoryModel] })
  let repository: CategoryRepository

  beforeEach(async () => {
    repository = new CategoryRepository(CategoryModel)
  })

  it("should throws error when category is invalid", () => {
    const model = CategoryModel.build({ id: '025a9698-d6a6-43fa-943f-3a2b21b6709a' })
    try {
      CategoryModelMapper.toEntity(model)
      fail('The category is valid , but it needs throws a LoadEntityError')
    } catch (err) {
      expect(err).toBeInstanceOf(LoadEntityError)
      expect(err.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters"
        ]
      })
    }
  });

  it("should throw a generic error", () => {
    const error = new Error('Generic Error')
    const spyValidate = jest.spyOn(Category, 'validate').mockImplementation(() => {
      throw error
    })
    const model = CategoryModel.build({ id: '025a9698-d6a6-43fa-943f-3a2b21b6709a' })
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error)
    expect(spyValidate).toHaveBeenCalled()
    spyValidate.mockRestore()
  })

  it("should convert a category model to a category entity", () => {
    const created_at = new Date()
    const model = CategoryModel.build({
      id: '025a9698-d6a6-43fa-943f-3a2b21b6709a',
      name: 'some name',
      description: 'some description',
      is_active: true,
      created_at
    })
    const entity = CategoryModelMapper.toEntity(model)
    expect(entity.toJSON()).toStrictEqual(
      new Category({
        name: 'some name',
        description: 'some description',
        is_active: true,
        created_at
      },
        new UniqueEntityId('025a9698-d6a6-43fa-943f-3a2b21b6709a')
      ).toJSON()
    )
  })
})