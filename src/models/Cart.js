import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
