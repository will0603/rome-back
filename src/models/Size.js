import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Size = sequelize.define("Size", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});
