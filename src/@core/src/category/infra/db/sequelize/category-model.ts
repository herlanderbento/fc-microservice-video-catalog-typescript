import { Model } from "sequelize";
import { Column, DataType, PrimaryKey, Table } from "sequelize-typescript";

type CategoriesModelProperties = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

@Table({ tableName: "categories", timestamps: false })
export class CategoryModel extends Model<CategoriesModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string | null;

  @Column({ allowNull: false })
  is_active: boolean;

  @Column({ allowNull: false })
  created_at: Date;
}