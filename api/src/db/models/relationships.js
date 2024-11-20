import { User } from './user.js';
import { Music } from './music.js';
import { Playlist } from './playlist.js';
import { Album } from './album.js';
// import { History } from './history.js';

Album.hasMany(Music, {onDelete: 'CASCADE'});
Music.belongsTo(Album);

User.hasMany(Album, {onDelete: 'CASCADE'});
Album.belongsTo(User);

User.hasMany(Music, { foreignKey: 'authorId', onDelete: 'CASCADE', as: 'createdMusics' });
Music.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Playlist.belongsToMany(Music, {
    through: 'Playlist_Music',
    foreignKey: 'playlistId',
    otherKey: 'musicId',
    onDelete: 'CASCADE',
    as: 'musics',
});

Music.belongsToMany(Playlist, {
    through: 'Playlist_Music',
    foreignKey: 'musicId',
    otherKey: 'playlistId',
    onDelete: 'CASCADE',
    as: 'playlists',
});

