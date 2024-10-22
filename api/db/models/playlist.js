import Sequelize from 'sequelize'
import db from '../db.js'

const Playlist = db.define('playlist', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }
})

export { Playlist };