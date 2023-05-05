import { UpdateCategoryUseCase } from '@fc/micro-videos/src/category/application';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto
  extends CreateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, 'id'> {}
