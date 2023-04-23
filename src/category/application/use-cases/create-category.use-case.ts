import { Category } from "../../domain/entities/category";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import CategoryRepository from "../../domain/repository/category.repository";
import UseCase from "../../../@seedwork/application/use-cases";

export default class CreateCategoryUseCase implements UseCase<Input, Output> {
  public constructor(
    private categoryRepository: CategoryRepository.Repository
  ) {}

  public async execute(input: Input): Promise<Output> {
    const entity = new Category(input);

    await this.categoryRepository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

export type Input = Omit<CategoryOutput, "id" | "created_at">;

export type Output = CategoryOutput;
