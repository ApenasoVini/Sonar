import { User } from './user.js';
import { Music } from './music.js';
// import { Playlist } from './playlist.js';
import { Album } from './album.js';
// import { History } from './history.js';

Album.hasMany(Music, { onDelete: 'CASCADE', foreignKey: 'albumid' });
Music.belongsTo(Album, { foreignKey: 'albumid' });

User.hasMany(Album, { onDelete: 'CASCADE', foreignKey: 'userid' });
Album.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Music, { onDelete: 'CASCADE', foreignKey: 'userid' });
Music.belongsTo(User, { foreignKey: 'userid' });

// Playlist.belongsToMany(Music, {
//     through: 'Playlist_Music',
//     foreignKey: 'playlistId',
//     otherKey: 'musicId',
//     onDelete: 'CASCADE',
//     as: 'musics',
// });

// Music.belongsToMany(Playlist, {
//     through: 'Playlist_Music',
//     foreignKey: 'musicId',
//     otherKey: 'playlistId',
//     onDelete: 'CASCADE',
//     as: 'playlists',
// });