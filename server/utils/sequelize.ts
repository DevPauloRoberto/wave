import { Sequelize } from 'sequelize'
import 'dotenv/config'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASS

if (!dbName || !dbUser || !dbHost || !dbPassword) {
    throw new Error("Uma ou mais variáveis de ambiente do banco de dados não estão definidas.")
}

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 60000,
            idle: 10000
        },
        retry: {
            match: [
                /Deadlock/i,
                'SequelizeConnectionError',
                'SequelizeConnectionRefusedError',
                'SequelizeHostNotFoundError',
                'SequelizeHostNotReachableError',
                'SequelizeInvalidConnectionError',
                'SequelizeConnectionTimedOutError'
            ],
            max: 3
        }
    }
);

export default sequelize