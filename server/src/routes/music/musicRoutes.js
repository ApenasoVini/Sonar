import express from "express";
import { getMusic, getMusicById, updateMusicPlays } from "./musicFunctions.js";
import { validate } from "../auth/authFunctions.js";

const musicRoutes = express.Router();

musicRoutes.get("/", validate, getMusic);
musicRoutes.get("/:id", validate, getMusicById);
musicRoutes.patch("/:id", validate, updateMusicPlays);

export default musicRoutes