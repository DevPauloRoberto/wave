import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

/**
 * Resolve a pasta "uploads/" de forma robusta para dev e preview/produção.
 */
function resolveUploadDir(): string {
    const candidates = [
        path.resolve(process.cwd(), 'uploads'),
        path.resolve(process.cwd(), '..', 'uploads'),
        path.resolve(process.cwd(), '..', '..', 'uploads'),
    ];
    for (const dir of candidates) {
        if (fs.existsSync(dir)) return dir;
    }
    // Se nenhuma existe ainda, usa cwd/uploads (será criada abaixo)
    return candidates[0];
}

export default defineEventHandler(async (event) => {
    // 1. Lê o arquivo enviado
    const files = await readMultipartFormData(event);

    if (!files || files.length === 0) {
        throw createError({ statusCode: 400, message: 'Nenhum arquivo enviado.' });
    }

    const file = files[0];

    // Validação de tipo (apenas imagens)
    if (!file.type?.startsWith('image/')) {
        throw createError({ statusCode: 400, message: 'Apenas imagens são permitidas.' });
    }

    // 2. Define o nome do arquivo: AGORA SEMPRE .webp
    const fileName = `${randomUUID()}.webp`;

    // Caminho na RAIZ do projeto (fora de public)
    const uploadDir = resolveUploadDir();
    const filePath = path.join(uploadDir, fileName);

    // Garante que a pasta existe
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    try {
        // 3. Processa e Salva usando SHARP
        // - Pega o buffer do arquivo (file.data)
        // - (Opcional) Redimensiona para evitar imagens gigantescas
        // - Converte para WebP
        // - Salva no disco
        await sharp(file.data)
            .resize({
                width: 1200,
                withoutEnlargement: true // Não estica imagens pequenas
            })
            .webp({ quality: 80 }) // Compressão de 80%
            .toFile(filePath);

        // 4. Retorna a URL para o frontend
        // A sua rota server/routes/uploads/[...path].get.ts vai servir esse arquivo
        return {
            url: `/uploads/${fileName}`
        };

    } catch (error) {
        console.error('Erro ao processar imagem:', error);
        throw createError({ statusCode: 500, message: 'Erro ao processar e salvar a imagem.' });
    }
});