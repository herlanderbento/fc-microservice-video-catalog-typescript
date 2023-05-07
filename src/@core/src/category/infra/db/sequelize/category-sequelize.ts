import {
  NotFoundError,
  EntityValidationError,
  SortDirection,
  UniqueEntityId,
} from "#seedwork/domain";
import {
  CategoryRepository as CategoryRepositoryContract,
  Category,
} from "#category/domain";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";

export class CategoryRepository implements CategoryRepositoryContract.Repository {
  sortableFields: string[] = ["name", "created_at"];

  public constructor(private categoryModel: typeof CategoryModel) { }

  public async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  public async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`
    const model = await this._get(_id);
    return CategoryModelMapper.toEntity(model)
  }
  //@ts-expect-error
  public async findAll(): Promise<Category[]> {
  }
  public async update(entity: Category): Promise<void> {
  }

  public async delete(id: string | UniqueEntityId): Promise<void> {
  }
  public async search(searchParams: CategoryRepositoryContract.SearchParams
  ):
    Promise<CategoryRepositoryContract.SearchResult> {
      return
  }

  private async _get(id: string): Promise<CategoryModel> {
    return this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`)
    })
  }
}