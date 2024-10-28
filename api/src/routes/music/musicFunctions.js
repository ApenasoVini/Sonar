import { Music } from './models/Music.js';

export const createMusic = async (req, res) => {
  try {
    const { title, gender, duration, link } = req.body;
    const newMusic = await Music.create({ title, gender, duration, link });
    return res.status(201).json(newMusic);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar música.' });
  }
};

export const getAllMusic = async (req, res) => {
  try {
    const musicList = await Music.findAll();
    return res.status(200).json(musicList);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar músicas.' });
  }
};

export const getMusicById = async (req, res) => {
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

export const getMusicByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    const musicList = await Music.findAll({
      where: { gender }
    });
    if (musicList.length === 0) {
      return res.status(404).json({ error: 'Nenhuma música encontrada.' });
    }
    return res.status(200).json(musicList);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar músicas.' });
  }
};

export const getMusicByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const musicList = await Music.findAll({
      where: { title }
    });
    if (musicList.length === 0) {
      return res.status(404).json({ error: 'Nenhuma música encontrada.' });
    }
    return res.status(200).json(musicList);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar músicas.' });
  }
};

export const updateMusic = async (req, res) => {
  try {
    const { title, gender, duration, link } = req.body;
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ error: 'Música não encontrada.' });
    }

    await music.update({ title, gender, duration, link });
    return res.status(200).json(music);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar música.' });
  }
};

export const deleteMusic = async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ error: 'Música não encontrada.' });
    }

    await music.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar música.' });
  }
};
