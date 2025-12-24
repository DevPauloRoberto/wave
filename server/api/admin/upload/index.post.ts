import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export default defineEventHandler(async (event) => {
    const files = await readMultipartFormData(event);

    if (!files || files.length === 0) {
        throw createError({ statusCode: 400, message: 'Nenhum arquivo enviado.' });
    }

    const file = files[0];

    if (!file.type?.startsWith('image/')) {
        throw createError({ statusCode: 400, message: 'Apenas imagens são permitidas.' });
    }


    const ext = path.extname(file.filename || '').toLowerCase() || '.jpg';
    const fileName = `${randomUUID()}${ext}`;

    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(filePath, file.data);

    return {
        url: `/uploads/${fileName}`
    };
});