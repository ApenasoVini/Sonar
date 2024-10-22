import Sequelize from 'sequelize';
import { User } from '../../db/models/user';

const userExists = await User.findOne({ where: { email: email } })
