import express from 'express';
import { createPlaylist, addMusics, removeMusics } from './playlistFunctions.js';
import { validate } from '../auth/authFunctions.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const playlistRoutes = express.Router();

playlistRoutes.post('/', validate, upload.fields([{ name: 'playlistImage', maxCount: 1 }]), createPlaylist);
playlistRoutes.post('/add', validate, addMusics);
playlistRoutes.post('/remove', validate, removeMusics);

export default playlistRoutes;