import DataTypes from 'sequelize';
import db from '../db.js';

const Album = db.define('album', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.ENUM(
            'pop', 'rock', 'rap', 'jazz', 'blues',
            'country', 'reggae', 'eletronica',
            'musica classica', 'gospel', 'latina'
        ),
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    albumImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export { Album };
