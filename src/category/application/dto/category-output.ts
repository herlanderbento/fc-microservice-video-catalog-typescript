import { Category } from "../../domain/entities/category";

export type CategoryOutput = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
  created_at: Date;
};

export class CategoryOutputMapper {
  public static toOutput(entity: Category) {
    return entity.toJSON();
  }
}
