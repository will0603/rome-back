import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Image } from "./Image.js";
export const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

Category.belongsTo(Image, {
  foreignKey: "image_id",
});
