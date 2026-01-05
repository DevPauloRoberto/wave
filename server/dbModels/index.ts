import { sequelize } from '../utils/sequelize';
import { Admin } from './Admin';
import { Autor } from './Autor';
import { Categoria } from './Categoria';
import { Noticia } from './Noticia';
import { NoticiaTags } from './NoticiaTags';
import { Tag } from './Tag';

const models = [
    Admin,
    Categoria,
    Tag,
    Noticia,
    Autor,
    NoticiaTags,
];

export const initModels = () => {
    models.forEach(model => model.init);
    for (const model of models) {
        if (typeof (model as any).associate === 'function') {
            (model as any).associate();
        }
    }
    console.log('Modelos e associações inicializados com sucesso.');
};

export {
    sequelize,
    Admin,
    Categoria,
    Noticia,
    NoticiaTags,
    Autor,
    Tag
};