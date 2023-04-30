import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryUseCase, ListCategoriesUseCase } from '@fc/micro-videos/src/category/application'

@Controller('categories')
export class CategoriesController {
  public constructor(
    private readonly categoriesService: CategoriesService,
    private createCategoryUseCase: CreateCategoryUseCase.UseCase,
    private listCategoriesUseCase: ListCategoriesUseCase.UseCase
  ) { }

  @Post()
  public create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute({
      name: 'Movie'
    })
    // return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  public findAll() {
    return this.listCategoriesUseCase.execute({});
    // return this.categoriesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
