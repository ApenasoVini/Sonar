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
    isOwner: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});

export { Playlist };
