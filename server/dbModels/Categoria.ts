import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { ICategoria } from '../interface/Categoria';
import { Noticia } from './Noticia';

export class Categoria extends Model<
    InferAttributes<Categoria>,
    InferCreationAttributes<Categoria>
> implements ICategoria {

    declare id: CreationOptional<number>;
    declare nome: string;
    declare tipo: number;

    public static associate() {
        Categoria.hasMany(Noticia, {
            foreignKey: 'categoriaId',
            as: 'noticias',
        });
    }
}

Categoria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '1: K-Pop, 2: K-Drama'
        }
    },
    {
        sequelize,
        tableName: 'categorias',
        timestamps: false,
    }
);