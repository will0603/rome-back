import { Collection, Image } from "../models/index.js";

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll();
    res.send({ message: "Lista de colecciones", content: collections });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const { name, url_img, description } = req.body;
    const newImage = await Image.create({ url_img });
    const newCategory = await Collection.create({
      name,
      description,
      image_id: newImage.id,
    });
    res.send({
      message: "Colección creada satisfactoriamente",
      content: newCategory,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, url_img } = req.body;
    const collection = await Collection.findByPk(id);
    if (collection) {
      if (url_img) {
        const imageOfCollection = await Image.findByPk(collection.image_id);
        await imageOfCollection.update({
          url_img,
        });
      }
      const updatedCollection = await collection.update({
        name,
        description,
      });
      res.send({
        message: "Colección actualizada exitosamente",
        content: updatedCollection,
      });
    } else {
      throw new Error("La colección a actualizar no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
