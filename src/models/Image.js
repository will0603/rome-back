import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  url_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
