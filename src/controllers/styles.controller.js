import { styleConfig } from "../helpers/index.js";
import { Style, StyleImages, Image } from "../models/index.js";

export const getStyles = async (req, res) => {
  try {
    const styles = await Style.findAll(styleConfig);
    if (styles) {
      res.send({
        message: "Estilos de productos",
        content: styles,
      });
    } else {
      throw new Error("Estilos no encontrados en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getOneStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const style = await Style.findByPk(id, styleConfig);
    if (style) {
      res.send({
        message: "Estilo encontrado",
        content: style,
      });
    } else {
      throw new Error("Estilo no encontrado en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateStyle = async (req, res) => {
  try {
    const { product_id, size_id, color_id, stock, url_imgs, discount } =
      req.body;
    const { id } = req.params;
    const style = await Style.findByPk(id);

    if (style) {
      //actualizando atributos
      await style.update({
        product_id: product_id || style.product_id,
        size_id: size_id || style.size_id,
        color_id: color_id || style.color_id,
        stock: stock || style.stock,
        discount: discount || style.discount,
      });
      if (url_imgs) {
        //obteniendo imagenes para posterior eliminación
        const styleImages = await StyleImages.findAll({
          where: { style_id: style.id },
        });
        //eliminacion de las imagenes en la tabla intermedia
        await StyleImages.destroy({
          where: { style_id: style.id },
        });
        //eliminacion de las imagenes en la tabla Imagen
        for (const styleImage of styleImages) {
          await Image.destroy({
            where: { id: styleImage.image_id },
          });
        }
        for (const url_img of url_imgs) {
          const newImage = await Image.create({
            url_img,
          });
          if (newImage) {
            await StyleImages.create({
              style_id: style.id,
              image_id: newImage.id,
            });
          } else {
            throw new Error("Error al crear imagenes");
          }
        }
      }
      const infoStyle = await Style.findByPk(style.id, styleConfig);
      res.send({
        message: "Estilo actualizado exitosamente",
        content: infoStyle,
      });
    } else {
      throw new Error("El estilo a actualizar no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createStyle = async (req, res) => {
  try {
    const { product_id, size_id, color_id, stock, url_imgs } = req.body;
    const newStyle = await Style.create({
      product_id,
      size_id,
      color_id,
      stock,
    });
    for (const url_img of url_imgs) {
      const newImage = await Image.create({
        url_img,
      });
      if (newImage) {
        await StyleImages.create({
          style_id: newStyle.id,
          image_id: newImage.id,
        });
      } else {
        throw new Error("Error al crear imagenes");
      }
    }
    const infoStyle = await Style.findByPk(newStyle.id, styleConfig);
    res.send({
      message: "Estilo de producto creado exitosamente",
      content: infoStyle,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
