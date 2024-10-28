import express from 'express';
import { createUser, loginUser, getUserById, deleteUser } from './userFunctions.js';

const userRoutes = express.Router();
userRoutes.post('/register', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/user/:id', getUserById);
userRoutes.delete('/user/:id', deleteUser);

export default userRoutes;