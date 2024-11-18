import express from 'express';
import { login } from "./authFunctions.js"
const authRoutes = express.Router();

authRoutes.post("/", login)

export default authRoutes;
