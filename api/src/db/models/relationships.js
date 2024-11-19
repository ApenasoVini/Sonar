import { User } from './user.js';
import { Music } from './music.js';
import { Playlist } from './playlist.js';
import { Album } from './album.js';
import { History } from './history.js';

User.hasMany(Album, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'albums' });
Album.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Music, { foreignKey: 'authorId', onDelete: 'CASCADE', as: 'musics' });
Music.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Album.hasMany(Music, { foreignKey: 'albumId', onDelete: 'CASCADE', as: 'musics' });
Music.belongsTo(Album, { foreignKey: 'albumId', as: 'album' });

Playlist.belongsToMany(Music, { through: 'Playlist_Music', foreignKey: 'playlistId', otherKey: 'musicId', onDelete: 'CASCADE', as: 'musics' });
Music.belongsToMany(Playlist, { through: 'Playlist_Music', foreignKey: 'musicId', otherKey: 'playlistId', onDelete: 'CASCADE', as: 'playlists' });
