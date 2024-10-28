import { Playlist } from '../../db/models/playlist';

export const createPlaylist = async (req, res) => {
    const { name, userId, musicId } = req.body;

    try {
        const userExists = await Playlist.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            dateBirth,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o usuário.', error });
    }
};


export const getPlaylistById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Playlist.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        else {
            return res.status(200).json(user);
        }

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuário.', error });
    }
};

export const deletePlaylist = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Playlist.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        await user.destroy();
        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar o usuário.', error });
    }
};