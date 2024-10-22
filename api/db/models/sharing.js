import Sequelize from 'sequelize'
import db from '../db.js'
import { User } from './user.js';
import { Music } from './music.js';

const Sharing = db.define('sharing', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
})

Music.belongsToMany(User, { through: 'sharing' });

export { Sharing };