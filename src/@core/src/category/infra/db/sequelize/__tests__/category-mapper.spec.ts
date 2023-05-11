import { CategorySequelize } from "../category-sequelize"
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain"
import { setupSequelize } from "#seedwork/infra"
import { Category } from "#category/domain"

describe("CategoryModelMapper", () => {
  setupSequelize({ models: [CategorySequelize.CategoryModel] })
  let repository: CategorySequelize.CategoryRepository

  beforeEach(async () => {
    repository = new CategorySequelize.CategoryRepository(CategorySequelize.CategoryModel)
  })

  it("should throws error when category is invalid", () => {
    const model = CategorySequelize.CategoryModel.build({ id: '025a9698-d6a6-43fa-943f-3a2b21b6709a' })
    try {
      CategorySequelize.CategoryModelMapper.toEntity(model)
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
    const model = CategorySequelize.CategoryModel.build({ id: '025a9698-d6a6-43fa-943f-3a2b21b6709a' })
    expect(() => CategorySequelize.CategoryModelMapper.toEntity(model)).toThrow(error)
    expect(spyValidate).toHaveBeenCalled()
    spyValidate.mockRestore()
  })

  it("should convert a category model to a category entity", () => {
    const created_at = new Date()
    const model = CategorySequelize.CategoryModel.build({
      id: '025a9698-d6a6-43fa-943f-3a2b21b6709a',
      name: 'some name',
      description: 'some description',
      is_active: true,
      created_at
    })
    const entity = CategorySequelize.CategoryModelMapper.toEntity(model)
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