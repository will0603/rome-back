import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  total_amount: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
