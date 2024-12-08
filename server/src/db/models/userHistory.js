import DataTypes from 'sequelize';
import db from '../db.js';

const UserHistory = db.define('userHistory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
    }
},
    { timestamps: false }
);

export { UserHistory }