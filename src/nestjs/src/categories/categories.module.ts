import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CreateCategoryUseCase, ListCategoriesUseCase } from '@fc/micro-videos/src/category/application';
import { CategoryInMemoryRepository } from '@fc/micro-videos/src/category/infra';
import { CategoryRepository } from '@fc/micro-videos/src/category/domain';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepo);
      },
      inject: ['CategoryInMemoryRepository'],
    },
  ],
})
export class CategoriesModule { }
