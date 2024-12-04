import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USERNAME, DB_HOST, DB_PASSWORD, PORT } = process.env;

const db = new Sequelize({
    dialect: "postgres",
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: PORT,
    ssl: true,
    logging: false,
    dialectOptions: {
        connectTimeout: 60000,
    },
});

export default db;
