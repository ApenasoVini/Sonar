import { User } from './user.js';
import { Music } from './music.js';
import { Playlist } from './playlist.js';
import { Album } from './album.js';

Album.hasMany(Music, { onDelete: 'CASCADE', foreignKey: 'albumid' });
Music.belongsTo(Album, { foreignKey: 'albumid' });

User.hasMany(Album, { onDelete: 'CASCADE', foreignKey: 'userid' });
Album.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Music, { onDelete: 'CASCADE', foreignKey: 'userid' });
Music.belongsTo(User, { foreignKey: 'userid' });

Playlist.belongsToMany(Music, {
    through: 'PlaylistMusic',
    foreignKey: 'playlistid',
    onDelete: 'CASCADE',
});
Music.belongsToMany(Playlist, {
    through: 'PlaylistMusic',
    foreignKey: 'musicid',
    onDelete: 'CASCADE',
});

User.hasMany(Playlist, { onDelete: 'CASCADE', foreignKey: 'userid' });
Playlist.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(UserHistory, {onDelete: 'CASCADE'});
UserHistory.belongsTo(User);

Song.hasMany(UserHistory, {onDelete: 'CASCADE'});
UserHistory.belongsTo(Song);