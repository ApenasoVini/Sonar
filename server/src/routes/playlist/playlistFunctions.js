import { Playlist } from '../../db/models/playlist.js';
import { Music } from '../../db/models/music.js';
import { User } from '../../db/models/user.js';
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

const getPlaylists = async (req, res) => {
    try {
        const { name = "" } = req.query;

        const conditions = name
            ? { name: { [Op.like]: `%${name}%` } }
            : {};

        const playlists = await Playlist.findAll({
            where: conditions,
        });

        return res.status(200).json({ status: "success", data: playlists });
    } catch (error) {
        console.error("Erro ao buscar playlists:", error);
        return res.status(500).json({ error: `Erro ao buscar playlists: ${error.message}` });
    }
};

const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Music },
            ],
        });

        if (!playlist) {
            return res.status(404).json({ error: "Playlist não encontrada." });
        }

        return res.status(200).json({ status: "success", data: playlist });
    } catch (error) {
        console.error("Erro ao buscar playlist:", error);
        return res.status(500).json({ error: `Erro ao buscar playlist: ${error.message}` });
    }
};

const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.user.id;

        const playlist = await Playlist.findOne({ where: { id, userid } });

        if (!playlist) {
            return res.status(404).json({ error: "Álbum não encontrado." });
        }

        await playlist.destroy();
        return res.status(200).json({ status: "success", message: "Álbum excluído com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir playlist:", error);
        return res.status(500).json({ error: `Erro ao excluir playlist: ${error.message}` });
    }
};

const updatePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isPublic } = req.body;

        const playlistExists = await Playlist.findOne({ where: { id } });
        if (!playlistExists) {
            return res.status(400).send({ error: 'Playlist não existente' });
        }

        const updatedData = {};

        if (req.files) {
            const imageFile = req.files['playlistImage'][0];
            const upload = await uploadImage(imageFile);
            if (upload !== 'err') {
                updatedData.playlistImage = upload;
            } else {
                return res.status(500).json({ error: 'Erro ao fazer upload da imagem.' });
            }
        }

        if (name) updatedData.name = name;
        if (isPublic) updatedData.isPublic = isPublic;

        await Playlist.update(updatedData, { where: { id } });

        return res.status(200).json({ status: 'success', data: updatedData });
    } catch (e) {
        console.error('Erro ao atualizar playlist:', e);
        return res.status(500).send({
            error: 'Erro interno ao atualizar a playlist.',
            details: e.message,
        });
    }
};

const favoritePlaylist = async (req, res) => {
    try {
        const { id } = req.params;

        const playlist = await Playlist.findOne({ where: { id } });

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist não encontrada' });
        }

        const newStatus = !playlist.isFavorited;

        await playlist.update({ isFavorited: newStatus });

        res.status(200).json({
            status: 'success',
            message: `Playlist ${newStatus ? 'favoritada' : 'removida dos favoritos'} com sucesso`,
            data: playlist,
        });
    } catch (error) {
        console.error('Erro ao favoritar playlist:', error);
        res.status(500).json({ error: 'Erro interno ao favoritar a playlist.' });
    }
};

export { createPlaylist, addMusics, removeMusics, getPlaylists, getPlaylistById, deletePlaylist, updatePlaylist, favoritePlaylist };
