import { Cart } from "./Cart.js";
import { CartItem } from "./CartItem.js";
import { Category } from "./Category.js";
import { Collection } from "./Collection.js";
import { Color } from "./Color.js";
import { Image } from "./Image.js";
import { Product } from "./Product.js";
import { Size } from "./Size.js";
import { Style } from "./Style.js";
import { User } from "./User.js";
import { Order } from "./Order.js";
import { OrderItem } from "./OrderItem.js";
import { StyleImages } from "./StyleImage.js";

Cart.belongsTo(User, {
  foreignKey: "user_id",
});
Cart.hasMany(CartItem, { foreignKey: "cart_id", as: "cart_items" });

CartItem.belongsTo(Style, {
  foreignKey: "style_id",
  as: "styles",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cart_id",
});

Order.belongsTo(User, {
  foreignKey: "user_id",
});
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "order_items" });

OrderItem.belongsTo(Order, {
  foreignKey: "order_id",
});

OrderItem.belongsTo(Style, {
  foreignKey: "style_id",
  as: "style",
});

User.hasMany(Order, { foreignKey: "user_id" });

Order.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Category.belongsTo(Image, {
  foreignKey: "image_id",
});

Collection.belongsTo(Image, {
  foreignKey: "image_id",
});

Product.hasMany(Style, { foreignKey: "product_id", as: "styles" });

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

Product.belongsTo(Collection, {
  foreignKey: "collection_id",
  as: "collection",
});

Style.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

Style.belongsTo(Size, {
  foreignKey: "size_id",
  as: "size",
});

Style.belongsTo(Color, {
  foreignKey: "color_id",
  as: "color",
});

Style.belongsToMany(Image, {
  through: StyleImages,
  foreignKey: "style_id",
  as: "images_urls",
});
Image.belongsToMany(Style, {
  through: StyleImages,
  foreignKey: "image_id",
  as: "styles",
});

export {
  Cart,
  CartItem,
  Category,
  Collection,
  Color,
  Image,
  Product,
  Size,
  Style,
  StyleImages,
  User,
  Order,
  OrderItem,
};
