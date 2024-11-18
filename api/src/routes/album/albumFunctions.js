import { parseStream } from "music-metadata";
import { uploadAudio, uploadImage } from "../../cloudinary/cloudinary.js";
import { User } from "../../db/models/user.js";
import { Music } from "../../db/models/music.js";
import { Album } from "../../db/models/album.js";
import { Readable } from "node:stream";
import { Op } from "sequelize";
import db from "../../db/db.js";

const bufferToStream = (buffer) => {
    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
};

const createAlbum = async (req, res) => {
    const transaction = await db.transaction();
    try {
        const { name, genre } = req.body;
        const { id: userId } = req.user;
        const musics = req.files["musics"] || [];
        const albumImage = req.files["albumImage"]?.[0] || "";

        if (!name || musics.length === 0) {
            return res.status(400).json({ error: "Preencha todos os dados obrigatórios (nome e músicas)." });
        }

        const uploadedImage = albumImage ? await uploadImage(albumImage) : null;

        const newAlbum = await Album.create(
            { name, albumImage: uploadedImage || null, UserId: userId },
            { transaction }
        );

        let totalDuration = 0;
        for (let music of musics) {
            const metadata = await parseStream(bufferToStream(music.buffer), null, { duration: true });
            const duration = Math.floor(metadata.format.duration || 0);
            totalDuration += duration;

            const uploadedAudio = await uploadAudio(music);
            if (uploadedAudio === "err") throw new Error("Erro ao carregar áudio.");

            await Music.create(
                {
                    name: music.originalname.split(".")[0],
                    duration,
                    link: uploadedAudio,
                    AlbumId: newAlbum.id,
                    genre,
                },
                { transaction }
            );
        }

        await newAlbum.update({ duration: totalDuration }, { transaction });
        await transaction.commit();

        res.status(201).json({ status: "success", data: newAlbum });
    } catch (e) {
        await transaction.rollback();
        res.status(500).json({ error: `Erro ao criar álbum: ${e.message}` });
    }
};

const getAlbums = async (req, res) => {
    try {
        const { name = "", includeSongs = false } = req.query;

        const albums = await Album.findAll({
            where: {
                name: { [Op.like]: `%${name}%` },
            },
            include: [
                { model: User, attributes: ["username"] },
                ...(includeSongs ? [{ model: Music }] : []),
            ],
        });

        res.status(200).json({ status: "success", data: albums });
    } catch (e) {
        res.status(500).json({ error: `Erro ao buscar álbuns: ${e.message}` });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id, {
            include: [
                { model: Music },
                { model: User, attributes: ["username"] },
            ],
        });

        if (!album) return res.status(404).json({ error: "Álbum não encontrado." });

        res.status(200).json({ status: "success", data: album });
    } catch (e) {
        res.status(500).json({ error: `Erro ao buscar álbum: ${e.message}` });
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const album = await Album.findOne({ where: { id, UserId: userId } });
        if (!album) return res.status(404).json({ error: "Álbum não encontrado." });

        await album.destroy();
        res.status(200).json({ status: "success", message: "Álbum excluído com sucesso." });
    } catch (e) {
        res.status(500).json({ error: `Erro ao excluir álbum: ${e.message}` });
    }
};

export { createAlbum, getAlbums, getAlbumById, deleteAlbum };
