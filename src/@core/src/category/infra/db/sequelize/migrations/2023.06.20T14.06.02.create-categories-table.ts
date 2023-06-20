import { DataTypes, Sequelize } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("categories", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("categories");
};

// describe("", () => {
//   const sequelize = setupSequelize();

//   it("up", async () => {
//     await migrator(sequelize.sequelize).up({
//       to: "2023.06.20T14.06.02.create-categories-table.ts",
//     });
//     CategoryModel.create({});
//   });

//   it("down", async () => {
//     const umzug = migrator(sequelize.sequelize);
//     await umzug.up({ to: "2023.06.20T14.06.02.create-categories-table.ts" });
//     await umzug.down({ to: 0 });

//     await umzug.executed();
//   });
// });
