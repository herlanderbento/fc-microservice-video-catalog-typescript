import { Category } from "../../domain/entities/category";
import { CategoryOutput } from "../dto/category-output";
import CategoryRepository from "../../domain/repository/category.repository";

export default class CreateCategoryUseCase {
  public constructor(
    private categoryRepository: CategoryRepository.Repository
  ) {}

  public async execute(input: Input): Promise<Output> {
    const entity = new Category(input);

    await this.categoryRepository.insert(entity);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}

export type Input = Omit<CategoryOutput, "id" | "created_at">;

export type Output = CategoryOutput;
