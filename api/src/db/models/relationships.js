import { User } from './user.js';
import { Music } from './music.js';
import { Playlist } from './playlist.js';
import { Album } from './album.js';
import { History } from './history.js';

User.belongsToMany(Playlist, { through: 'Playlist_User', onDelete: 'CASCADE', as: 'Playlists' });
Playlist.belongsToMany(User, { through: 'Playlist_User', onDelete: 'CASCADE', as: 'Users' });

Music.belongsToMany(Playlist, { through: 'Music_Playlist', onDelete: 'CASCADE' });
Playlist.belongsToMany(Music, { through: 'Music_Playlist', onDelete: 'CASCADE' });

User.hasMany(History, { onDelete: 'CASCADE' });
History.belongsTo(User);

Music.hasMany(History, { onDelete: 'CASCADE' });
History.belongsTo(Music);

User.hasMany(Album, { onDelete: 'CASCADE' });
Album.belongsTo(User);
