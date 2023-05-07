import {
  NotFoundError,
  EntityValidationError,
  SortDirection,
  UniqueEntityId,
} from ".././../../../@seedwork/domain";
import {
  CategoryRepository as CategoryRepositoryContract,
  Category,
} from "../../../domain";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import { Op } from "sequelize";

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

  public async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();

    return models.map((model) => CategoryModelMapper.toEntity(model));
  }

  public async update(entity: Category): Promise<void> {
  }

  public async delete(id: string | UniqueEntityId): Promise<void> {
  }

  public async search(props: CategoryRepositoryContract.SearchParams
  ):
    Promise<CategoryRepositoryContract.SearchResult> {
    const offset = (props.page - 1) * props.per_page
    const limit = props.per_page

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && { where: { name: { [Op.like]: `%${props.filter}%` } } }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [['created_at', 'DESC']] }),
      offset,
      limit
    })

    return new CategoryRepositoryContract.SearchResult({
      items: models.map((model) => CategoryModelMapper.toEntity(model)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir
    })
  }

  private async _get(id: string): Promise<CategoryModel> {
    return this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`)
    })
  }
}