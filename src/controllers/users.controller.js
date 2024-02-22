import { comparePassword } from "../helpers/index.js";
import { Cart, User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send({ message: "Lista de usuarios", content: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      res.send({
        message: "Usuario solicitado",
        content: user,
      });
    } else {
      throw new Error("El usuario solicitado no existe en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createdUser = await User.create({
      name,
      email,
      password,
    });
    if (createdUser) {
      await Cart.create({ user_id: createdUser.id });
      res.send({
        message: "Usuario creado exitosamente",
        content: createdUser,
      });
    } else {
      throw new Error("Error al crear usuario");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      if (user.status === 1) {
        throw new Error("El usuario ya esta loggeado");
      }
      const validatePassword = await comparePassword(password, user.password);
      if (validatePassword) {
        await user.update({
          status: 1,
        });
        res.send({
          message: "Usuario loggeado exitosamente",
          content: user.id,
        });
      } else {
        throw new Error("Contraseña incorrecta");
      }
    } else {
      throw new Error("Este correo no esta registrado");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, type: "error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
      if (user.status === 1) {
        await user.update({
          status: 0,
        });
        res.send({ message: "Usuario desloggeado exitosamente" });
      } else {
        throw new Error("El usuario aún no esta loggeado");
      }
    } else {
      throw new Error("El usuario no exite en la BD");
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
