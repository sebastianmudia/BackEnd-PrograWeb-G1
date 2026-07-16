import Sequelize from 'sequelize'
import pg from 'pg'

// Si existe DATABASE_URL (ej. Neon/Vercel) se usa ese connection string con SSL;
// si no, se conecta al Postgres local de desarrollo.

const url = process.env.DATABASE_URL || ''

const sequelize = url
    ? new Sequelize(url, {
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        },
        pool: { max: 2 }
    })
    : new Sequelize('ulima_eventos', 'postgres', '1234', {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        dialectModule: pg
    });

export default sequelize;
