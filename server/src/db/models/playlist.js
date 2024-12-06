import { DataTypes } from 'sequelize';
import db from '../db.js';

const Playlist = db.define('playlists', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playlistImage: {
        type: DataTypes.STRING,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isFavorited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export { Playlist };
