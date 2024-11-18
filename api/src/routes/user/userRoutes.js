import express from 'express';
import { createUser, getUserById, updateUser, deleteUser, getAllUsers } from './userFunctions.js';
import { validate } from '../auth/authFunctions.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const userRoutes = express.Router();

userRoutes.post('/register', upload.fields([{ name: 'profileImage', maxCount: 1 }]), createUser);
userRoutes.get('/:id', getUserById);
userRoutes.get('/', getAllUsers);
userRoutes.delete('/:id', validate, deleteUser);
userRoutes.patch('/:id', validate, upload.fields([{ name: 'profileImage', maxCount: 1 }]), updateUser);

export default userRoutes;