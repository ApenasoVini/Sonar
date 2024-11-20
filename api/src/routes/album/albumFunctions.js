import { parseBuffer } from "music-metadata";
import { uploadAudio, uploadImage } from "../../cloudinary/cloudinary.js";
import { User } from "../../db/models/user.js";
import { Music } from "../../db/models/music.js";
import { Album } from "../../db/models/album.js";
import { Op } from "sequelize";

const createAlbum = async (req, res) => {
    try {
        const user = req.user;
        const data = req.body;
        const musics = req.files['musics'] || [];
        let albumImage = req.files['albumImage']?.[0] || '';

        if (!data.name || !data.genre) {
            return res.status(400).json({ error: "Nome e gênero são obrigatórios." });
        }

        if (albumImage) {
            const upload = await uploadImage(albumImage);
            if (upload !== 'err') albumImage = upload;
        }

        const album = await Album.create({
            name: data.name,
            genre: data.genre,
            albumImage,
            userId: user.id,
        });

        let totalDuration = 0;
        for (let musicFile of musics) {
            const metadata = await parseBuffer(musicFile.buffer, null, { duration: true });
            const duration = Math.floor(metadata.format.duration || 0);
            totalDuration += duration;

            const audioUrl = await uploadAudio(musicFile);
            if (audioUrl === 'err') {
                await album.destroy();
                return res.status(500).send({ error: 'Erro ao carregar músicas' });
            }

            await Music.create({
                name: musicFile.originalname.split('.')[0],
                duration,
                audioUrl,
                genre: data.genre,
                albumId: album.id,
                authorId: user.id,
            });
        }

        album.duration = totalDuration;
        await album.save();

        return res.status(201).send({ status: 'success', data: album });
    } catch (e) {
        return res.status(500).send({ error: `Erro ao criar álbum: ${e.message}` });
    }
};

const getAlbums = async (req, res) => {
    try {
        const { name = "" } = req.query; 
        const conditions = {};

        if (name) {
            conditions.name = {
                [Op.like]: `%${name}%`,
            };
        }

        const albums = await Album.findAll({
            where: conditions,
            // include: [
            //     { model: Music, as: "musics" },
            //     { model: User, attributes: ["username"], as: "users" },
            // ],
        });

        return res.status(200).send({
            status: "success",
            data: albums,
        });
    } catch (e) {
        return res.status(500).json({ error: `Erro ao buscar álbuns: ${e.message}` });
    }
};


const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id, {
            // include: [
            //     { model: Music, as: "musics" },
            //     { model: User, attributes: ["username"], as: "users" },
            // ],
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

        const album = await Album.findOne({ where: { id, userId } });
        if (!album) return res.status(404).json({ error: "Álbum não encontrado." });

        await album.destroy();
        res.status(200).json({ status: "success", message: "Álbum excluído com sucesso." });
    } catch (e) {
        res.status(500).json({ error: `Erro ao excluir álbum: ${e.message}` });
    }
};

export { createAlbum, getAlbums, getAlbumById, deleteAlbum };
