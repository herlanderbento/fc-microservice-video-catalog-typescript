import { Category } from "../../domain/entities/category";
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

interface CreateCategoryUseCaseProps {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at: Date;
}

export type Input = Omit<CreateCategoryUseCaseProps, "id" | "created_at">;

export type Output = CreateCategoryUseCaseProps;
