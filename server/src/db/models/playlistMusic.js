import { DataTypes } from 'sequelize';
import db from '../db.js';

const PlaylistMusic = db.define('playlistMusic', {
    playlistid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'playlists',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    musicid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'musics',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
});

export { PlaylistMusic };
