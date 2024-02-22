import { Color } from "../models/index.js";

export const getColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.send({ message: "Lista de colores", content: colors });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createColor = async (req, res) => {
  try {
    const { name, color_code } = req.body;
    const newColor = await Color.create({
      name,
      color_code,
    });
    res.send({ message: "Color creado exitosamente", content: newColor });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
