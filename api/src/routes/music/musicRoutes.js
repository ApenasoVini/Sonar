import express from 'express';
import {
    createMusic,
    getAllMusics,
    getMusicById,
    updateMusic,
    deleteMusic
} from './musicFunctions.js';

const musicRoutes = express.Router();

musicRoutes.post('/', createMusic);
musicRoutes.get('/', getAllMusics);
musicRoutes.get('/:id', getMusicById);
musicRoutes.patch('/:id', updateMusic);
musicRoutes.delete('/:id', deleteMusic);

export default musicRoutes;
