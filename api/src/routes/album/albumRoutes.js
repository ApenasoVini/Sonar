import express from "express";
import { createAlbum, getAlbums, getAlbumById, deleteAlbum } from "./albumFunctions.js";
import { validate } from "../auth/authFunctions.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/", validate, upload.fields([{ name: "musics" }, { name: "albumImage" }]), createAlbum);
router.get("/", getAlbums);
router.get("/:id", getAlbumById);
router.delete("/:id", validate, deleteAlbum);

export default router;
