import { parseStream } from "music-metadata";
import { uploadAudio, uploadImage } from "../../cloudinary/cloudinary.js";
import { User } from "../../db/models/user.js";
import { Music } from "../../db/models/music.js";
import { Album } from "../../db/models/album.js";
import { Readable } from "node:stream";
import { Op } from "sequelize";

const createAlbum = async (req, res) => {
    try {
        const data = req.body;
        const user = req.user;
        const musics = req.files["musics"];
        let albumImage = "";
        try {
            albumImage = req.files["albumImage"][0];
        }
        catch { }

        let duration = 0;

        if (albumImage) {
            const upload = await uploadImage(albumImage);
            if (upload !== "err") albumImage = upload;
        }

        const createAlbum = await Album.create({
            name: data.name,
            genre: data.genre,
            albumImage: albumImage,
            UserId: user.id
        });

        const bufferToStream = (buffer) => {
            const readable = new Readable();
            readable._read = () => { };
            readable.push(buffer);
            readable.push(null);
            return readable;
        }

        for (let music of musics) {
            const metadata = await parseStream(bufferToStream(music.buffer), null, { duration: true });
            const durationsInSecs = Math.floor(metadata.format.duration);
            duration = duration + durationsInSecs;

            if (duration === 0) duration = 0;

            const upload = await uploadAudio(music);
            if (upload === "err") return res.status(500).send({
                "error": "Erro ao carregar as músicas",
            });
            
            const createMusic = await music.create({
                name: music.originalname.split(".")[0],
                duration: duration || 0,
                audioUrl: upload,
                AlbumId: createAlbum.dataValues.id,
                genre: data.genre
            });
        }

        const updateAlbumWithTotalTime = await Album.update(
            { duration: duration },
            { where: { id: createAlbum.dataValues.id } },
        );

        return res.status(201).send({
            "status": "success",
            "data": { createAlbum },
        });
    }
    catch (e) {
        return res.status(500).send({
            "error": `${e}`,
        });
    }
}

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
