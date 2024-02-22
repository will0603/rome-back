import { cartConfig } from "../helpers/index.js";
import { Cart } from "../models/index.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll(cartConfig);
    res.send({ message: "Lista de carritos", content: carts });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getCartByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { user_id: id }, ...cartConfig });
    res.send({ message: "Carrito del usuario", content: cart });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
