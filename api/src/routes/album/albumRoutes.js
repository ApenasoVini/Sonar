import express from "express";
import { createAlbum, getAlbums, getAlbumById, deleteAlbum } from "./albumFunctions.js";
import { validate } from "../auth/authFunctions.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const albumRoutes = express.Router();

albumRoutes.post("/", validate, upload.fields([{ name: "musics" }, { name: "albumImage" }]), createAlbum);
albumRoutes.get("/", getAlbums);
albumRoutes.get("/:id", getAlbumById);
albumRoutes.delete("/:id", validate, deleteAlbum);

export default albumRoutes;
