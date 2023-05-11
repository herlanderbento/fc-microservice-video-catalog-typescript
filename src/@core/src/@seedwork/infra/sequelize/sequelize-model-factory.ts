import { Model } from "sequelize-typescript";

export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
  private _count: number = 1;

  public constructor(
    private model,
    private defaultFactoryProps: () => ModelProps
  ) {}

  public count(count: number): this {
    this._count = count;
    return this;
  }

  public async create(data?: ModelProps): Promise<ModelClass> {
    return this.model.create(data ? data : this.defaultFactoryProps());
  }

  public make(data?: ModelProps): Promise<ModelClass> {
    return this.model.build(data ? data : this.defaultFactoryProps());
  }

  public async bulkCreate(
    factoryProps?: (index: number) => ModelProps
  ): Promise<ModelClass[]> {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return await this.model.bulkCreate(data);
  }

  public bulkMake(factoryProps?: (index: number) => ModelProps): ModelClass[] {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return this.model.bulkBuild(data);
  }
}

export default SequelizeModelFactory;
