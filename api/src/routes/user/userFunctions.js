import { User } from '../../db/models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { uploadImage } from '../../cloudinary/cloudinary.js';
import Sequelize from 'sequelize';

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const emailExists = await User.findOne({
      where: { email: data.email },
    });
    if (emailExists) {
      return res.status(400).send({ error: 'Email já cadastrado' });
    }

    const usernameExists = await User.findOne({
      where: { username: data.username },
    });
    if (usernameExists) {
      return res.status(400).send({ error: 'Esse username já está sendo usado' });
    }

    if (req.files && req.files['profileImage']) {
      const imageFile = req.files['profileImage'][0];
      const upload = await uploadImage(imageFile);
      if (upload !== 'err') data.profileImage = upload;
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const newUser = await User.create(data);
    return res.status(201).send({
      status: 'success',
      data: newUser,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      error: 'Erro interno ao criar o usuário.',
      details: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ where: { email: data.email, } });
    if (!user) return res.status(400).json({ error: 'Email ou senha incorretos' });

    const ok = await bcrypt.compare(data.password, user.password);
    console.log(ok)
    if (!ok) return res.status(400).json({ error: 'Email ou senha incorretos' });

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.status(200).json({ status: 'success', token });

  } catch (e) {
    console.error("Erro no login:", e.message);
    return res.status(500).send({
      error: 'Erro interno no login.',
      details: e.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const user = await User.findOne({
      where: {
        id: id
      },
      attributes: {
        exclude: ['password']
      },
    });
    if (!user) {
      return res.status(400).send({
        "error": "Usuário não existente",
      });
    }

    return res.status(200).send({
      "status": "success",
      "data": user
    });
  }
  catch (e) {
    return res.status(500).send({
      "error": `${e}`,
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(400).send({
        "error": "Usuário não existente",
      });
    }
    await User.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ "status": "success" });
  }
  catch (e) {
    return res.status(500).send({
      "error": `${e}`,
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(400).send({
        "error": "Usuário não existente",
      });
    }

    await User.update(
      data,
      {
        where: {
          id: id,
        }
      },
    );
    return res.status(200).json({ "status": "success" });
  }
  catch (e) {
    console.log(e)
    return res.status(500).send({
      "error": `${e}`,
    });
  }
}

const getAllUsers = async (req, res) => {
  try {
    let { username } = req.query;
    const conditions = {};

    if (!username || username === "") {
      username = "";
    }

    if (username) {
      conditions.username = {
        [Op.like]: `%${username}%`,
      };
    }

    const users = await User.findAll({
      where: conditions,
      attributes: {
        exclude: ['password']
      },
    });

    return res.status(200).send({
      "status": "success",
      "data": users,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuários.', error });
  }
};

export { createUser, getUserById, updateUser, login, deleteUser, getAllUsers };
