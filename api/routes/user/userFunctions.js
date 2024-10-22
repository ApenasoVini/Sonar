import { User } from '../../db/models/user';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  const { firstName, lastName, email, dateBirth, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      dateBirth,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar o usuário.', error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso', user });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    else {
      return res.status(200).json(user);
    }

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuário.', error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await user.destroy();
    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar o usuário.', error });
  }
};