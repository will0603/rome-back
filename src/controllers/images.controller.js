import { Image } from "../models/index.js";

export const getImages = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
