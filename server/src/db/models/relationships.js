import { User } from './user.js';
import { Music } from './music.js';
import { Playlist } from './playlist.js';
import { Album } from './album.js';
// import { History } from './history.js';

Album.hasMany(Music, { onDelete: 'CASCADE', foreignKey: 'albumid' });
Music.belongsTo(Album, { foreignKey: 'albumid' });

User.hasMany(Album, { onDelete: 'CASCADE', foreignKey: 'userid' });
Album.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Music, { onDelete: 'CASCADE', foreignKey: 'userid' });
Music.belongsTo(User, { foreignKey: 'userid' });

Playlist.belongsToMany(Music, { onDelete: 'CASCADE', foreignKey: 'playlistid' });
Music.belongsToMany(Playlist, { onDelete: 'CASCADE', foreignKey: 'musicid', });
