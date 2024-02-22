import { Size } from "../models/index.js";

export const getSizes = async (req, res) => {
  try {
    const sizes = await Size.findAll();
    res.send({ message: "Lista de tallas", content: sizes });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createSize = async (req, res) => {
  try {
    const { name } = req.body;
    const newSize = await Size.create({
      name,
    });
    res.send({ message: "Talla creada exitosamente", content: newSize });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
