import { Op } from 'sequelize';
import { Music } from '../../db/models/music.js';

const getMusic = async (req, res) => {
  try {
    let { genre, name } = req.query;
    const conditions = {};

    if (!genre || genre === '') {
      genre = '';
    }

    if (!name || name === '') {
      name = '';
    }

    if (name) {
      conditions.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (genre) {
      conditions.genre = {
        [Op.like]: `%${genre}%`,
      };
    }

    const musics = await User.findAll({
      where: conditions,
    });

    return res.status(200).send({
      'status': 'success',
      'data': musics,
    });

  } catch (e) {
    return res.status(500).send({
      'error ao buscar músicas': `${e}`,
    });
  }
}

const getMusicById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const music = await Music.findOne({
      where: {
        id: id
      }
    });
    if (!music) {
      return res.status(400).send({
        'error': 'Música não encontrada',
      });
    }

    return res.status(200).send({
      'status': 'success',
      'data': music
    });
  }
  catch (e) {
    return res.status(500).send({
      'error': `${e}`,
    });
  }
}

const updateMusicPlays = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const checkMusic = await Song.findOne({
      where: {
        id: id,
      }
    });
    if (!checkMusic) {
      return res.status(400).send({
        'error': 'Música não encontrada',
      });
    }

    const update = await Song.update({
      views: checkMusic.views + 1,
      where: {
        id: id,
      }
    });

    return res.status(200).send({
      'status': 'success',
      'data': update
    });
  }
  catch (e) {
    return res.status(500).send({
      'error': `${e}`,
    });
  }
}



export { getMusic, getMusicById, updateMusicPlays };