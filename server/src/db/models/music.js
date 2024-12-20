import DataTypes from 'sequelize';
import db from '../db.js';

const Music = db.define('musics', {
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
            'funk', 'trap', 'drill', 'country',
            'reggae', 'eletronica', 'musica classica',
            'gospel', 'latina'
        ),
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    audioUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    albumid: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export { Music };
