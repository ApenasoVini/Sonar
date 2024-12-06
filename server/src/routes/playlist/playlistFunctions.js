import { Playlist } from '../../db/models/playlist.js';
import { Music } from '../../db/models/music.js';
import { uploadImage } from "../../cloudinary/cloudinary.js";

const validate = async (userid, playlistid, musicids) => {
    const playlist = await Playlist.findOne({ where: { id: playlistid, userid: userid } });
    if (!playlist) {
        throw new Error("Playlist não encontrada ou não pertence ao usuário.");
    }

    const validMusics = await Music.findAll({ where: { id: musicids } });
    if (validMusics.length !== musicids.length) {
        throw new Error("Alguns IDs de músicas não foram encontrados.");
    }

    return { playlist, validMusics };
};

const createPlaylist = async (req, res) => {
    try {
        const { name, mscs } = req.body;
        const musics = Array.isArray(mscs) ? mscs : JSON.parse(mscs);

        if (!name || musics.length === 0) {
            return res.status(400).json({ error: "Nome e IDs de músicas são obrigatórios." });
        }

        let playlistImage = null;
        if (req.files?.['playlistImage']?.[0]) {
            playlistImage = await uploadImage(req.files['playlistImage'][0]);
            if (!playlistImage) {
                return res.status(500).json({ error: "Erro ao carregar imagem da playlist." });
            }
        }

        const { validMusics } = await validate(req.user.id, null, musics);

        const playlist = await Playlist.create({ name, userid: req.user.id, playlistImage });
        await playlist.addMusics(validMusics);

        res.status(201).json({ status: "success", data: playlist });
    } catch (error) {
        console.error("Erro ao criar playlist:", error);
        res.status(500).json({ error: error.message });
    }
};

const addMusics = async (req, res) => {
    try {
        const { playlistid, mscs } = req.body;

        if (!playlistid || !mscs || !Array.isArray(mscs)) {
            return res.status(400).json({ error: "Playlist ID e uma lista de IDs de músicas são obrigatórios." });
        }

        const { playlist, validMusics } = await validate(req.user.id, playlistid, mscs);
        await playlist.addMusics(validMusics);

        res.status(200).json({ message: "Músicas adicionadas com sucesso." });
    } catch (error) {
        console.error("Erro ao adicionar músicas:", error);
        res.status(500).json({ error: error.message });
    }
};

const removeMusics = async (req, res) => {
    try {
        const { playlistid, mscs } = req.body;

        if (!playlistid || !mscs || !Array.isArray(mscs)) {
            return res.status(400).json({ error: "Playlist ID e uma lista de IDs de músicas são obrigatórios." });
        }

        const { playlist, validMusics } = await validate(req.user.id, playlistid, mscs);
        await playlist.removeMusics(validMusics);

        res.status(200).json({ message: "Músicas removidas com sucesso." });
    } catch (error) {
        console.error("Erro ao remover músicas:", error);
        res.status(500).json({ error: error.message });
    }
};

export { createPlaylist, addMusics, removeMusics };
