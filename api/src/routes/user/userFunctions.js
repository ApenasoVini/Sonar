import { User } from '../../db/models/user.js';
import bcrypt from 'bcrypt';
import { uploadImage } from '../../cloudinary/cloudinary.js';
import { Op } from 'sequelize';

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

    if (req.files) {
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
        'error': 'Usuário não existente',
      });
    }

    return res.status(200).send({
      'status': 'success',
      'data': user
    });
  }
  catch (e) {
    return res.status(500).send({
      'error': `${e}`,
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(400).send({
        error: 'Usuário não existente',
      });
    }

    await User.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      'status': 'success',
    });
  } catch (e) {
    return res.status(500).send({
      error: `${e}`,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, description, dateBirth, password } = req.body
    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(400).send({ error: 'Usuário não existente' });
    }

    const updatedData = {};

    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedData.password = hashedPassword;
    }

    if (req.files) {
      const imageFile = req.files['profileImage'][0];
      const upload = await uploadImage(imageFile);
      if (upload !== 'err') {
        updatedData.profileImage = upload;
      } else {
        return res.status(500).json({ error: 'Erro ao fazer upload da imagem.' });
      }
    }

    if (name) updatedData.name = name;
    if (username) updatedData.username = username;
    if (description) updatedData.description = description;
    if (dateBirth) updatedData.dateBirth = dateBirth;

    await User.update(updatedData, { where: { id: id } });

    return res.status(200).json({
      status: 'success',
      data: updatedData,
    });
  } catch (e) {
    console.error('Erro ao atualizar usuário:', e);
    return res.status(500).send({
      error: 'Erro interno ao atualizar o usuário.',
      details: e.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let { username } = req.query;
    const conditions = {};

    if (!username || username === '') {
      username = '';
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
      'status': 'success',
      'data': users,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuários.', error });
  }
};

export { createUser, getUserById, updateUser, deleteUser, getAllUsers };