import Sequelize from 'sequelize'

const db = new Sequelize(
    'sonardb',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)

export { db };