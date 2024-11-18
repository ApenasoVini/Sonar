import express from 'express';
import {
    createMusic,
    getAllMusics,
    getMusicById,
    deleteMusic
} from './musicFunctions.js';
import { validate } from '../auth/authFunctions.js'; 

const musicRoutes = express.Router();

musicRoutes.post('/', validate, createMusic);
musicRoutes.get('/', getAllMusics);
musicRoutes.get('/:id', getMusicById);
musicRoutes.delete('/:id', validate, deleteMusic);

export default musicRoutes;
