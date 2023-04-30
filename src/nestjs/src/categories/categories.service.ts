import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  public create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  public findAll() {
    return `This action returns all categories`;
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
