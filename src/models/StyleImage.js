import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const StyleImages = sequelize.define("StyleImages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
