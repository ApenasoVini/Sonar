import DataTypes from 'sequelize';
import db from '../db.js';

const Music = db.define('music', {
    id: {   
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.ENUM(
            'pop', 'rock', 'rap', 'jazz', 'blues', 
            'country', 'reggae', 'eletronica', 
            'musica classica', 'gospel', 'latina'
        ),
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    authorId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id',
        },
    },
    audioUrl: {
        type: DataTypes.STRING, 
        allowNull: false,
    }
});

export { Music };
