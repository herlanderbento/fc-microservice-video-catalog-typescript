import { CategoryRepository } from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(
      private categoryRepository: CategoryRepository.Repository
    ) {}

    public async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepository.findById(input.id);
      entity.update(input.name, input.description);

      if (input.is_active === true) {
        entity.activate();
      }

      if (input.is_active === false) {
        entity.deactivate();
      }

      await this.categoryRepository.update(entity);

      return CategoryOutputMapper.toOutput(entity);
    }
  }

  export type Input = Omit<CategoryOutput, "created_at">;

  export type Output = CategoryOutput;
}

export default UpdateCategoryUseCase;
