import { Category, Image } from "../models/index.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send({
      message: "Lista de categorias",
      content: categories,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (category) {
      res.send({ message: "Categoria encontrada", content: category });
    } else {
      throw new Error("La categoria solicitada no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, url_img } = req.body;
    const newImage = await Image.create({
      url_img,
    });
    const newCategory = await Category.create({
      name,
      image_id: newImage.id,
    });
    res.send({
      message: "Categoria creada exitosamente",
      content: newCategory,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, url_img } = req.body;
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (category) {
      if (url_img) {
        const imageOfCategory = await Image.findByPk(category.image_id);
        await imageOfCategory.update({
          url_img,
        });
      }
      const updatedCategory = await category.update({
        name,
      });
      res.send({
        message: "Categoria actualizada exitosamente",
        content: updatedCategory,
      });
    } else {
      throw new Error("La categoría a actualizar no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
