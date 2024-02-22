import { orderConfig } from "../helpers/index.js";
import { Cart, CartItem, Order, OrderItem, Style } from "../models/index.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll(orderConfig);
    res.send({ message: "Lista de ordenes realizadas", content: orders });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, orderConfig);

    if (order) {
      res.send({ message: "Orden recuperada", content: order });
    } else {
      throw new Error("La orden solicitada no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.findAll({
      where: { user_id: id },
      ...orderConfig,
    });
    res.send({ message: "Lista de ordenes del usuario", content: orders });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { user_id, total_amount } = req.body;
    const userCart = await Cart.findOne({ where: { user_id } });
    const cartItems = await CartItem.findAll({
      where: { cart_id: userCart.id },
    });
    const newOrder = await Order.create({
      date: new Date().toISOString(),
      total_amount,
      user_id,
      status: 0,
    });
    if (newOrder) {
      for (const cart_item of cartItems) {
        const styleOfCartItem = await Style.findByPk(cart_item.style_id);
        const newOrderItem = await OrderItem.create({
          quantity: cart_item.quantity,
          current_discount: styleOfCartItem.discount,
          style_id: styleOfCartItem.id,
          order_id: newOrder.id,
        });

        const styleToUpdate = await Style.findByPk(newOrderItem.style_id);
        await styleToUpdate.update({
          stock: styleToUpdate.stock - newOrderItem.quantity,
        });
      }
      res.send({ message: "Orden creada exitosamente", content: newOrder });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
