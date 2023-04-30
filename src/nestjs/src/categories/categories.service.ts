import { Inject, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@fc/micro-videos/src/category/application';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;
  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;
  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;
  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;
  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  public create(createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }

  public search(input: ListCategoriesUseCase.Input) {
    return this.listUseCase.execute(input);
  }

  public findOne(id: GetCategoryUseCase.Input) {
    return this.getUseCase.execute(id);
  }

  public update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
  }

  public remove(id: DeleteCategoryUseCase.Input) {
    return this.deleteUseCase.execute(id);
  }
}
