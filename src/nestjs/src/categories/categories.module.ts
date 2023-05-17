import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CATEGORIES_PROVIDER } from './categories.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorySequelize } from '@fc/micro-videos/src/category/infra';

@Module({
  imports: [SequelizeModule.forFeature([CategorySequelize.CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ...Object.values(CATEGORIES_PROVIDER.REPOSITORIES),
    ...Object.values(CATEGORIES_PROVIDER.USE_CASES),
  ],
})
export class CategoriesModule {}
