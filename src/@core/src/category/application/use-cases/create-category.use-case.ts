import { Category } from "../../domain/entities/category";
import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";

export namespace CreateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
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
}

export default CreateCategoryUseCase;
