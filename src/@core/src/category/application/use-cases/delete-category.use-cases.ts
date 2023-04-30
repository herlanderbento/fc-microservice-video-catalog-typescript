import { CategoryRepository } from "../../domain/repository/category.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-cases";

export namespace DeleteCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    public constructor(
      private categoryRepository: CategoryRepository.Repository
    ) { }

    public async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepository.findById(input.id);
      await this.categoryRepository.delete(entity.id);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = void;
}

export default DeleteCategoryUseCase;
