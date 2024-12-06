import express from 'express';
import { createPlaylist } from './playlistFunctions.js';
import { validate } from '../auth/authFunctions.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const userRoutes = express.Router();

userRoutes.post('/', validate, upload.fields([{ name: 'playlistImage', maxCount: 1 }]), createPlaylist);

export default playlistRoutes;