import Sequelize, { DataTypes } from 'sequelize'
import db from '../db.js'

const User = db.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dateBirth: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    profileImage: {
        type: Sequelize.STRING,
    },
    userType: {
        type: DataTypes.ENUM('user', 'artist', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

export { User };