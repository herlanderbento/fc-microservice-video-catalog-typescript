import { Category } from "../../../../category/domain";
import { EntityValidationError, LoadEntityError, UniqueEntityId } from "../../../../@seedwork/domain";
import { CategoryModel } from "./category-model";

export class CategoryModelMapper {
  public static toEntity(model: CategoryModel) {
    const { id, ...otherDate } = model.toJSON()

    try {
      return new Category(otherDate, new UniqueEntityId(id))
    } catch (err) {
      if (err instanceof EntityValidationError) {
        throw new LoadEntityError(err.error)
      }

      throw err
    }
  }
}