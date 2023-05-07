import { Model } from "sequelize-typescript"

export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {

  constructor(private model, private defaultFactoryProps: () => ModelProps) { }

  public async create(data?: ModelProps): Promise<ModelClass> {
    return this.model.create(data ? data : this.defaultFactoryProps());
  }

  public async bulkCreate() { }

  public make() { }

  public bulkMake() { }
}

export default SequelizeModelFactory