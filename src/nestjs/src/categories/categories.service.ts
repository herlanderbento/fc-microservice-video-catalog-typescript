import { Inject, Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryUseCase, ListCategoriesUseCase } from '@fc/micro-videos/src/category/application'

@Injectable()
export class CategoriesService {
  @Inject(CreateCategoryUseCase.UseCase)
  private createCategoryUseCase: CreateCategoryUseCase.UseCase
  @Inject(ListCategoriesUseCase.UseCase)
  private listCategoriesUseCase: ListCategoriesUseCase.UseCase

  public create(createCategoryDto: CreateCategoryUseCase.Input) {
    return this.createCategoryUseCase.execute(createCategoryDto)
  }

  public search(input: ListCategoriesUseCase.Input) {
    return this.listCategoriesUseCase.execute(input);
  }

  public findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  public update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  public remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
