import { Cart, CartItem, User } from "../models/index.js";

export const createCartItem = async (req, res) => {
  try {
    const { quantity, style_id, user_id } = req.body;
    const userCart = await Cart.findOne({ where: { user_id } });
    const isOnCart = await CartItem.findOne({ where: { style_id } });
    if (isOnCart) {
      const updatedCartItem = isOnCart.update({
        quantity: isOnCart.quantity + quantity,
        cart_id: userCart.id,
        style_id,
      });
      res.send({
        message: "Producto actualizado exitosamente",
        content: updatedCartItem,
      });
    } else {
      const newCartItem = await CartItem.create({
        quantity,
        cart_id: userCart.id,
        style_id,
      });
      res.send({
        message: "Producto agregado al carrito exitosamente",
        content: newCartItem,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItem = await CartItem.findByPk(id);
    const cartItemUpdated = await cartItem.update({
      quantity,
    });
    res.send({
      message: "Producto del carrito actualizado exitosamente",
      content: cartItemUpdated,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.destroy({ where: { id } });
    res.send({
      message: "Producto eliminado del carrito exitosamente",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
