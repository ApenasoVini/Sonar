import express from 'express';
import {
    createMusic,
    getAllMusic,
    getMusicById,
    getMusicByGender,
    getMusicByTitle,
    updateMusic,
    deleteMusic
} from './musicFunctions.js';

const router = express.Router();

router.post('/music', createMusic);
router.get('/music', getAllMusic);
router.get('/music/:id', getMusicById);
router.get('/music/gender/:gender', getMusicByGender);
router.get('/music/title/:title', getMusicByTitle);
router.put('/music/:id', updateMusic);
router.delete('/music/:id', deleteMusic);

export default router;
