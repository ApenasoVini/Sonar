import { Music } from '../../db/models/music.js';
import { User } from '../../db/models/user.js';
import { Op } from 'sequelize';
import { uploadAudio } from '../../cloudinary/cloudinary.js';

const createMusic = async (req, res) => {
  try {
      const { name, gender, duration } = req.body;
      const audioFile = req.files?.audio;

      if (!audioFile) {
          return res.status(400).json({ error: 'É necessário fornecer um áudio.' });
      }

      const audioUrl = await uploadAudio(audioFile);

      if (audioUrl === "err") {
          return res.status(500).json({ error: 'Erro ao fazer upload do áudio.' });
      }

      const newMusic = await Music.create({
          name,
          gender,
          duration,
          audioUrl,
          authorId: req.user.id 
      });

      return res.status(201).json(newMusic);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar música.' });
  }
};

const deleteMusic = async (req, res) => {
  try {
      const music = await Music.findByPk(req.params.id);

      if (!music) {
          return res.status(404).json({ error: 'Música não encontrada.' });
      }

      if (music.authorId !== req.user?.id) {
          return res.status(403).json({ error: 'Apenas o autor pode excluir esta música.' });
      }

      await music.destroy();
      return res.status(204).send();
  } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar música.' });
  }
};

const getMusicById = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ error: 'Música não encontrada.' });
    }
    return res.status(200).json(music);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar música.' });
  }
};

const getAllMusics = async (req, res) => {
  try {
    const { name, gender, author } = req.query;
    const filters = {};

    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (gender) filters.gender = gender;

    if (author) {
      const authorUser = await User.findOne({ where: { name: { [Op.like]: `%${author}%` } } });
      if (authorUser) {
        filters.authorId = authorUser.id;
      } else {
        return res.status(404).json({ error: 'Autor não encontrado.' });
      }
    }

    const musicList = await Music.findAll({ where: filters });

    if (musicList.length === 0) {
      return res.status(404).json({ error: 'Nenhuma música encontrada.' });
    }

    return res.status(200).json(musicList);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar músicas.' });
  }
};

export {
  createMusic,
  getAllMusics,
  getMusicById,
  deleteMusic
};
