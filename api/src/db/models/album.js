import DataTypes from 'sequelize'
import db from '../db.js'

const Album = db.define('album', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    albumImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})


export { Album };