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
        logging: false,

        // Configurações do Pool de Conexões Otimizadas
        pool: {
            max: 5,        // Reduzi para 5 (mais leve para dev)
            min: 0,
            acquire: 30000, // 30s é suficiente
            idle: 500      // AGRESSIVO: Libera a conexão após 0.5s de inatividade. 
            // Isso evita conexões "zumbis" travando o hot-reload.
        },

        // Configurações diretas do driver mysql2
        dialectOptions: {
            connectTimeout: 10000, // Desiste rápido se o banco não responder
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