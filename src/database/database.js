import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres",
  "postgres",
  "Excelentexd1?",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
