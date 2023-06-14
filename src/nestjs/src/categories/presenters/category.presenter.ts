import {
  CategoryOutput,
  ListCategoriesUseCase,
} from '@fc/micro-videos/src/category/application';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../../@share/presenter/collection.presenter';

export class CategoryPresenter {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString().slice(0, 19) + '.000z';
  })
  created_at: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  public data: CategoryPresenter[];

  constructor(output: ListCategoriesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
