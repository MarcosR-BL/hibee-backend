import { Sequelize } from 'sequelize';

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const name = process.env.DB_NAME;
const host = process.env.DB_HOST;

// Verifica que las variables de entorno están definidas
if (!user || !password || !name || !host) {
    throw new Error('Environment variables DB_USER, DB_HOST,DB_NAME, or DB_PASSWORD are not defined');
}

const db = new Sequelize(name, user, password, {
    host,
    dialect: 'mysql',
    logging: false,
});

export default db;