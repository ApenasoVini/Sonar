import { DataTypes } from 'sequelize';
import db from '../db.js';

const PlaylistMusic = db.define('playlist_music', {
    playlistid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Playlist,
            key: 'id',
        },
    },
    musicid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Music,
            key: 'id',
        },
    },
});

export { PlaylistMusic };