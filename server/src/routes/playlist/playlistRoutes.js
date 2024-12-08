import express from 'express';
import {
    createPlaylist,
    addMusics,
    removeMusics,
    getPlaylists,
    getPlaylistById,
    deletePlaylist,
    updatePlaylist,
    favoritePlaylist,
} from './playlistFunctions.js';
import { validate } from '../auth/authFunctions.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const playlistRoutes = express.Router();

playlistRoutes.post('/', validate, upload.fields([{ name: 'playlistImage', maxCount: 1 }]), createPlaylist);
playlistRoutes.post('/add', validate, addMusics);
playlistRoutes.post('/remove', validate, removeMusics);
playlistRoutes.get('/', validate, getPlaylists);
playlistRoutes.get('/:id', validate, getPlaylistById);
playlistRoutes.delete('/:id', validate, deletePlaylist);
playlistRoutes.patch('/:id', validate, upload.fields([{ name: 'playlistImage', maxCount: 1 }]), updatePlaylist);
playlistRoutes.post('/:id/favorite', validate, favoritePlaylist);

export default playlistRoutes;