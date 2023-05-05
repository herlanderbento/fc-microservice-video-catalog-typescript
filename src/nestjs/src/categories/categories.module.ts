import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CATEGORIES_PROVIDER } from './categories.provider';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ...Object.values(CATEGORIES_PROVIDER.REPOSITORIES),
    ...Object.values(CATEGORIES_PROVIDER.USE_CASES),
  ],
})
export class CategoriesModule {}
