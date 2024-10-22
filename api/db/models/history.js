import Sequelize from 'sequelize';
import db from '../db.js';
import { User } from './user.js';
import { Music } from './music.js';

const History = db.define('history', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    musicId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Music,
            key: 'id'
        }
    },
    playedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

User.belongsToMany(Music, { through: History });
Music.belongsToMany(User, { through: History });

export { History };