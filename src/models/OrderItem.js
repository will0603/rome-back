import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Style } from "./index.js";

export const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    current_discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (orderItem) => {
        try {
          const style = await Style.findByPk(orderItem.style_id);
          if (style.stock < orderItem.quantity) {
            throw new Error("No hay stock");
          }
        } catch (error) {
          throw error;
        }
      },
    },
  }
);
