import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Style = sequelize.define("Style", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1,
    },
  },
});
