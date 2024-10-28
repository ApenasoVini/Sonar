import Sequelize from 'sequelize';
import db from '../db.js';

const Music = db.define('music', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: Sequelize.DataTypes.ENUM('pop', 'rock', 'rap', 'jazz', 'blues', 'country', 'reggae', 'eletronica', 'musica classica', 'gospel', 'latina'),
        allowNull: false,
    },
    duration: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    link: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
});

export { Music };
