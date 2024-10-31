import express from 'express';
import { createUser, login, getUserById, deleteUser, updateUser, getAllUsers, searchUserByUsername } from './userFunctions.js';
import multer from 'multer'
const storage = multer.memoryStorage();
const upload = multer({ storage });
const userRoutes = express.Router();

userRoutes.post('/register', upload.fields([{ name: 'profileImage', maxCount: 1 }]), createUser);
userRoutes.post('/login', upload.single('file'), login);
userRoutes.get('/:id', getUserById);
userRoutes.delete('/delete/:id', deleteUser);
userRoutes.get('/all', getAllUsers);
userRoutes.put('/edit/:id', updateUser);
userRoutes.get('/search', searchUserByUsername);

export default userRoutes;
