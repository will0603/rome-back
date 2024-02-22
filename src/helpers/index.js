import bcrypt from "bcrypt";
import {
  CartItem,
  Category,
  Collection,
  Color,
  Image,
  OrderItem,
  Product,
  Size,
  Style,
  User,
} from "../models/index.js";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error al generar hash:", error);
    throw error; // Relanzar el error para que sea manejado por el código que llama a hashPassword
  }
};
//usar al momento del login
export const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    throw error;
  }
};
// transformacion de data Style para el front
export const styleConfig = {
  include: [
    {
      model: Image,
      as: "images_urls",
      through: {
        attributes: [], // Excluye todos los atributos de la tabla intermedia
      },
      attributes: ["id", "url_img"],
    },
    {
      model: Color,
      as: "color",
      attributes: ["id", "name", "color_code"],
    },
    {
      model: Size,
      as: "size",
      attributes: ["id", "name"],
    },
    {
      model: Product,
      as: "product",
      attributes: ["id", "name", "price"],
    },
  ],
  attributes: ["id", "stock", "discount"],
};

export const productConfig = {
  order: [["id", "ASC"]],
  include: [
    {
      model: Collection,
      as: "collection",
      attributes: ["id", "name"],
    },
    {
      model: Category,
      as: "category",
      attributes: ["id", "name"],
    },
    {
      model: Style,
      as: "styles",
      include: [
        {
          model: Image,
          as: "images_urls",
          through: {
            attributes: [], // Excluye todos los atributos de la tabla intermedia
          },
          attributes: ["id", "url_img"],
        },
        {
          model: Color,
          as: "color",
          attributes: ["id", "name", "color_code"],
        },
        {
          model: Size,
          as: "size",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "stock", "discount"],
    },
  ],
  attributes: ["id", "name", "price"],
};

export const cartConfig = {
  include: [
    {
      model: CartItem,
      as: "cart_items",
      include: [
        {
          model: Style,
          as: "styles",
          include: [
            {
              model: Image,
              as: "images_urls",
              through: {
                attributes: [], // Excluye todos los atributos de la tabla intermedia
              },
              attributes: ["id", "url_img"],
            },
            {
              model: Color,
              as: "color",
              attributes: ["id", "name", "color_code"],
            },
            {
              model: Size,
              as: "size",
              attributes: ["id", "name"],
            },
            {
              model: Product,
              as: "product",
              include: [
                { model: Category, as: "category", attributes: ["id", "name"] },
                {
                  model: Collection,
                  as: "collection",
                  attributes: ["id", "name"],
                },
              ],
              attributes: ["id", "name", "price"],
            },
          ],
          attributes: ["id", "stock", "discount"],
        },
      ],
      attributes: ["id", "quantity"],
    },
  ],
};

export const orderConfig = {
  include: [
    {
      model: OrderItem,
      as: "order_items",
      attributes: ["id", "quantity", "current_discount"],
      include: [
        {
          model: Style,
          as: "style",
          include: [
            {
              model: Image,
              as: "images_urls",
              through: {
                attributes: [], // Excluye todos los atributos de la tabla intermedia
              },
              attributes: ["id", "url_img"],
            },
            {
              model: Color,
              as: "color",
              attributes: ["id", "name", "color_code"],
            },
            {
              model: Size,
              as: "size",
              attributes: ["id", "name"],
            },
            {
              model: Product,
              as: "product",
              include: [
                { model: Category, as: "category", attributes: ["id", "name"] },
                {
                  model: Collection,
                  as: "collection",
                  attributes: ["id", "name"],
                },
              ],
              attributes: ["id", "name", "price"],
            },
          ],
          attributes: ["id", "stock", "discount"],
        },
      ],
    },
    {
      model: User,
      as: "user",
      attributes: ["id", "name"],
    },
  ],
  attributes: ["id", "date", "total_amount", "status"],
};
