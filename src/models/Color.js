import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Color = sequelize.define("Color", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Nombre del color requerido",
      },
    },
  },
  color_code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Código del color requerido",
      },
    },
  },
});
