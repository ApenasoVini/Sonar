import express from "express";
import { getMusic, getMusicById, updateMusicPlays } from "./musicFunctions.js";
import { validate } from "../auth/authFunctions.js";

const router = express.Router();

router.get("/", validate, getMusic);
router.get("/:id", validate, getMusicById);
router.patch("/:id", validate, updateMusicPlays);

export default router