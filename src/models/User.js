import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { hashPassword } from "../helpers/index.js";
export const User = sequelize.define(
  "User",
  {
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
          msg: "El email es requerido",
        },
        notEmpty: {
          msg: "El campo name no puede estar vacío",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Este email ya esta asociado a una cuenta",
      },
      validate: {
        isEmail: {
          msg: "El formato del correo electrónico no es válido",
        },
        notNull: {
          msg: "El email es requerido",
        },
        notEmpty: {
          msg: "El campo email no puede estar vacío",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El email es requerido",
        },
      },
      notEmpty: {
        msg: "El campo password no puede estar vacío",
      },
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
      },
    },
  }
);
