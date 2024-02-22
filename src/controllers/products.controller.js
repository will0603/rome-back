import { productConfig } from "../helpers/index.js";
import { Product } from "../models/index.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll(productConfig);
    res.send({ message: "Lista de productos", content: products });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, productConfig);
    if (product) {
      res.send({ message: "Producto encontrado", content: product });
    } else {
      throw new Error("El producto solicitado no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category_id, collection_id } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      category_id,
      collection_id,
    });
    res.send({ message: "Producto creado exitosamente", content: newProduct });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, category_id, collection_id } = req.body;
    const { id } = req.params;
    const productToUpdate = await Product.findByPk(id);
    if (productToUpdate) {
      const updatedProduct = await productToUpdate.update({
        name,
        price,
        category_id,
        collection_id,
      });
      res.send({
        message: "Producto actualizado correctamente",
        content: updatedProduct,
      });
    } else {
      throw new Error("Producto a actualizar no encontrado");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
