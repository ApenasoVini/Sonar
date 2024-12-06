import { Playlist } from '../../db/models/playlists';
import { User } from '../../db/models/user';
import { Music } from '../../db/models/music';
import { Op } from "sequelize";
import { uploadImage } from "../../cloudinary/cloudinary.js";

const createPlaylist = async (req, res) => {
    try {
        const user = req.user;
        const data = req.body;
        const musics = req.files['musics'] || [];
        let playlistImage = req.files['playlistImage']?.[0] || '';

        if (!data.name || musics.length === 0) {
            return res.status(400).json({ error: "Nome e músicas são obrigatórios." });
        }

        if (playlistImage) {
            const upload = await uploadImage(playlistImage);
            if (upload === 'err') {
                return res.status(500).json({ error: "Erro ao carregar imagem da playlist." });
            }
            playlistImage = upload;
        }

        for (let music of musics) {
            musics.push(music);
        }

        const playlist = await Playlist.create({
            data,
            playlistImage,
            userid: user.id,
            musics,
        });

        return res.status(201).json({ status: "success", data: playlist });
    } catch (error) {
        console.error("Erro ao criar playlist:", error);
        return res.status(500).json({ error: `Erro ao criar playlist: ${error.message}` });
    }
};

//editar (adicionar ou excluir música)

//editar (tornar publica ou privada)

//editar (tornar favorita)

//excluir

//listar 

//listar por id


export { createPlaylist };