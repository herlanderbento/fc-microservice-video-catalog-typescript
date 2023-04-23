import { CategoryRepository } from "../../domain/repository/category.repository";
import UseCase from "../../../@seedwork/application/use-cases";

export default class DeleteCategoryUseCase implements UseCase<Input, Output> {
  public constructor(
    private categoryRepository: CategoryRepository.Repository
  ) {}

  public async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepository.findById(input.id);
    await this.categoryRepository.delete(entity.id);
  }
}

export type Input = {
  id: string;
};

export type Output = void;
