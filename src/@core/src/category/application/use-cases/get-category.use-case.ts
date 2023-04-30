import { CategoryRepository } from "../../domain/repository/category.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";

export namespace GetCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(
      private categoryRepository: CategoryRepository.Repository
    ) { }

    public async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepository.findById(input.id);

      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = Pick<CategoryOutput, "id">;

  export type Output = CategoryOutput;
}

export default GetCategoryUseCase;
