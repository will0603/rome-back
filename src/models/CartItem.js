import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Style } from "./index.js";

export const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeCreate: async (cartItem) => {
        try {
          const style = await Style.findByPk(cartItem.style_id);
          if (style.stock < cartItem.quantity) {
            throw new Error("No hay stock");
          }
        } catch (error) {
          throw error;
        }
      },
    },
  }
);
