import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
} from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { INoticia } from '../interface/Noticia';
import { Categoria } from './Categoria';
import { Tag } from './Tag';
import { NoticiaTags } from './NoticiaTags';
import { Autor } from './Autor'; // <--- Importante

export class Noticia extends Model<
    InferAttributes<Noticia>,
    InferCreationAttributes<Noticia>
> implements Omit<INoticia, 'dataPublicacao' | 'categoria' | 'tags' | 'autorId'> {

    declare id: CreationOptional<number>;
    declare titulo: string;
    declare subtitulo: string;
    declare autorId: ForeignKey<Autor['id']>;
    declare conteudo: string;
    declare img: string;
    declare dataPublicacao: CreationOptional<Date>;
    declare categoriaId: ForeignKey<Categoria['id']>;

    public static associate() {

        Noticia.belongsTo(Categoria, {
            foreignKey: 'categoriaId',
            as: 'categoria',
        });

        // <--- Nova Associação
        Noticia.belongsTo(Autor, {
            foreignKey: 'autorId',
            as: 'autor',
        });

        Noticia.belongsToMany(Tag, {
            through: NoticiaTags,
            foreignKey: 'idNoticia',
            as: 'tags',
        });
    }
}

Noticia.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        titulo: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        subtitulo: {
            type: new DataTypes.STRING(500),
            allowNull: false,
        },
        autorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'autores',
                key: 'id',
            },
        },
        conteudo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        img: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        dataPublicacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        categoriaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'noticias',
        timestamps: false,
    }
);