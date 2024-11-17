import { User } from './user.js';
import { Music } from './music.js';
import { Playlist } from './playlist.js';
import { Album } from './album.js';
import { History } from './history.js';

User.hasMany(Music, { foreignKey: 'authorId', onDelete: 'CASCADE', as: 'Musics' });
Music.belongsTo(User, { foreignKey: 'authorId', as: 'Author' });

Album.hasMany(Music, { foreignKey: 'albumId', onDelete: 'CASCADE' });
Music.belongsTo(Album, { foreignKey: 'albumId' });

User.hasMany(Album, { foreignKey: 'userId', onDelete: 'CASCADE' });
Album.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(History, { foreignKey: 'userId', onDelete: 'CASCADE' });
History.belongsTo(User, { foreignKey: 'userId' });

Music.hasMany(History, { foreignKey: 'musicId', onDelete: 'CASCADE' });
History.belongsTo(Music, { foreignKey: 'musicId' });

Playlist.belongsToMany(User, { 
    through: "Playlist_User", 
    foreignKey: 'playlistId', 
    otherKey: 'userId', 
    onDelete: 'CASCADE', 
    as: 'Users' 
});
User.belongsToMany(Playlist, { 
    through: "Playlist_User", 
    foreignKey: 'userId', 
    otherKey: 'playlistId', 
    onDelete: 'CASCADE', 
    as: 'Playlists' 
});

Playlist.belongsToMany(Music, { 
    through: "Playlist_Music", 
    foreignKey: 'playlistId', 
    otherKey: 'musicId', 
    onDelete: 'CASCADE', 
    as: 'Musics' 
});
Music.belongsToMany(Playlist, { 
    through: "Playlist_Music", 
    foreignKey: 'musicId', 
    otherKey: 'playlistId', 
    onDelete: 'CASCADE', 
    as: 'Playlists' 
});
