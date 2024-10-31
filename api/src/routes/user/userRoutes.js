import express from 'express';
import { createUser, login, getUserById, deleteUser, updateUser, getAllUsers } from './userFunctions.js';
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({ storage });
const userRoutes = express.Router();

userRoutes.post('/register', upload.fields([{ name: 'profileImage', maxCount: 1 }]), createUser);
userRoutes.post('/login', upload.single('file'), login);
userRoutes.get('/:id', getUserById);
userRoutes.delete('/:id', deleteUser);
userRoutes.get('/', getAllUsers);
userRoutes.put('/:id', updateUser);

export default userRoutes;
