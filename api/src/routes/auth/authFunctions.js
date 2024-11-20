import jwt from 'jsonwebtoken';
import { User } from '../../db/models/user.js';
import bcrypt from 'bcrypt';

const createToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Senha ou email incorretos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Senha ou email incorretos' });
        }

        const token = createToken(user);

        res.status(200).json({
            status: 'success',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const validateToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

const validate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = validateToken(token);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const method = req.route.stack[1].method;

        if (
            (['deleteUser', 'updateUser'].includes(method) && user.id !== parseInt(req.params.id)) ||
            (['createGenre', 'deleteGenre'].includes(method) && user.userType !== 'admin') ||
            (['createAlbum', 'deleteAlbum'].includes(method) && user.userType === 'artist')
        ) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

export { login, validate };
