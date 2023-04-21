import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";

export default class GetCategoryUseCase {
  public constructor(
    private categoryRepository: CategoryRepository.Repository
  ) {}

  public async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}

export type Input = Pick<CategoryOutput, "id">;

export type Output = CategoryOutput;
