import { parseBuffer } from "music-metadata";
import { uploadAudio, uploadImage } from "../../cloudinary/cloudinary.js";
import { User } from "../../db/models/user.js";
import { Music } from "../../db/models/music.js";
import { Album } from "../../db/models/album.js";
import { Op } from "sequelize";

// Função para criar um álbum
const createAlbum = async (req, res) => {
    try {
        const user = req.user;
        const { name, genre } = req.body;
        const musics = req.files['musics'] || [];
        let albumImage = req.files['albumImage']?.[0] || '';

        // Validação dos campos obrigatórios
        if (!name || !genre) {
            return res.status(400).json({ error: "Nome e gênero são obrigatórios." });
        }

        // Upload da imagem do álbum
        if (albumImage) {
            const upload = await uploadImage(albumImage);
            if (upload === 'err') {
                return res.status(500).json({ error: "Erro ao carregar imagem do álbum." });
            }
            albumImage = upload;
        }

        // Criação do álbum
        const album = await Album.create({
            name,
            genre,
            albumImage,
            userId: user.id,
        });

        let totalDuration = 0;

        // Processamento e upload das músicas
        for (let musicFile of musics) {
            const { duration } = await parseBuffer(musicFile.buffer, null, { duration: true }) || {};
            const audioUrl = await uploadAudio(musicFile);

            if (audioUrl === 'err') {
                await album.destroy();
                return res.status(500).json({ error: "Erro ao carregar músicas." });
            }

            totalDuration += Math.floor(duration || 0);

            await Music.create({
                name: musicFile.originalname.split('.')[0],
                duration: Math.floor(duration || 0),
                audioUrl,
                genre,
                albumid: album.id,
                authorId: user.id,
            });
        }

        // Atualizar a duração total do álbum
        album.duration = totalDuration;
        await album.save();

        return res.status(201).json({ status: "success", data: album });
    } catch (error) {
        console.error("Erro ao criar álbum:", error);
        return res.status(500).json({ error: `Erro ao criar álbum: ${error.message}` });
    }
};

// Função para listar todos os álbuns com filtros opcionais
const getAlbums = async (req, res) => {
    try {
        const { name = "" } = req.query;

        // Condições de filtro
        const conditions = name
            ? { name: { [Op.like]: `%${name}%` } }
            : {};

        const albums = await Album.findAll({
            where: conditions,
            include: [
                { model: Music }
                // { model: User, attributes: ["username"] },
            ],
        });

        return res.status(200).json({ status: "success", data: albums });
    } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
        return res.status(500).json({ error: `Erro ao buscar álbuns: ${error.message}` });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id, {
            include: [
                { model: Music }
                // { model: User, attributes: ["username"] }
            ],
        });

        if (!album) {
            return res.status(404).json({ error: "Álbum não encontrado." });
        }

        return res.status(200).json({ status: "success", data: album });
    } catch (error) {
        console.error("Erro ao buscar álbum:", error);
        return res.status(500).json({ error: `Erro ao buscar álbum: ${error.message}` });
    }
};

// Função para excluir um álbum
const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verificar se o álbum pertence ao usuário
        const album = await Album.findOne({ where: { id, userId } });

        if (!album) {
            return res.status(404).json({ error: "Álbum não encontrado." });
        }

        await album.destroy();
        return res.status(200).json({ status: "success", message: "Álbum excluído com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir álbum:", error);
        return res.status(500).json({ error: `Erro ao excluir álbum: ${error.message}` });
    }
};

export { createAlbum, getAlbums, getAlbumById, deleteAlbum };
