import { Playlist } from '../../db/models/playlists';
import { User } from '../../db/models/user';
import { Music } from '../../db/models/music';
import { Op } from "sequelize";
import { uploadImage } from "../../cloudinary/cloudinary.js";

const createPlaylist = async (req, res) => {
    try {
        const user = req.user;
        const { name, ispublic } = req.body;
        const musics = req.files['musics'] || [];
        let playlistImage = req.files['playlistImage']?.[0] || '';

        if (!name || !genre) {
            return res.status(400).json({ error: "Nome e gênero são obrigatórios." });
        }

        if (playlistImage) {
            const upload = await uploadImage(playlistImage);
            if (upload === 'err') {
                return res.status(500).json({ error: "Erro ao carregar imagem do álbum." });
            }
            playlistImage = upload;
        }

        const album = await Album.create({
            name,
            genre,
            playlistImage,
            userid: user.id,
        });

        let totalDuration = 0;

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
                userid: user.id,
            });
        }

        album.duration = totalDuration;
        await album.save();

        return res.status(201).json({ status: "success", data: album });
    } catch (error) {
        console.error("Erro ao criar álbum:", error);
        return res.status(500).json({ error: `Erro ao criar álbum: ${error.message}` });
    }
};

//editar (adicionar ou excluir música)

//editar (tornar publica ou privada)

//editar (tornar favorita)

//excluir

//listar 

//listar por id

