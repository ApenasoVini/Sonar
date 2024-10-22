import express from 'express';
import { createUser, loginUser, listUser, deleteUser } from './userFunctions';

const userRoutes = express.Router();
userRoutes.post('/register', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/users', listUser);
userRoutes.delete('/user/:id', deleteUser);

export default userRoutes;