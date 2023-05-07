import { Sequelize, SequelizeOptions } from "sequelize-typescript"

const sequelizeOpitons: SequelizeOptions = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
}

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize

  beforeAll(() => _sequelize = new Sequelize({
    ...sequelizeOpitons,
    ...options
  }))

  beforeEach(async () => {
    await _sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await _sequelize.close()
  })
  
  return {
    get sequelize() {
      return _sequelize;
    },
  };
}