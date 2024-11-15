import Sequelize from 'sequelize'
import db from '../db.js'

const Album = db.define('album', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    albumImage: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})


export { Album };