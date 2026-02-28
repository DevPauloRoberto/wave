import { sequelize } from '../utils/sequelize';
import { initModels } from '../dbModels/index';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function connectWithRetries() {
    let connected = false;
    let attempt = 0;

    while (!connected) {
        attempt++;
        console.log(`🔌 [PLUGIN] Tentativa de conexão com o DB #${attempt}...`);

        try {
            await sequelize.authenticate();
            initModels();

            // --- CRIAÇÃO DE TABELAS (SYNC) ---
            // Só sincroniza se DB_SYNC=true (definido no .env ou docker-compose)
            // Use apenas na primeira vez ou quando alterar models.
            const shouldSync = process.env.DB_SYNC === 'true';
            if (shouldSync) {
                await sequelize.sync({ alter: true });
                console.log('⚠️  [PLUGIN] Tabelas sincronizadas (DB_SYNC=true). Desative após confirmar.');
            }
            // ---------------------------------

            connected = true;
            console.log('🚀 [PLUGIN] Conexão com DB e Modelos inicializados com sucesso!');
        } catch (error) {
            console.error(`❌ [PLUGIN] Falha na tentativa #${attempt}:`);
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('Ocorreu um erro desconhecido durante a conexão:', error);
            }
            console.log('Tentando novamente em 5 segundos...');
            await sleep(5000);
        }
    }
}

export default defineNitroPlugin(async () => {
    await connectWithRetries();
});