import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { ICategoria } from '../interface/Categoria';
import { Noticia } from './Noticia'; // Importado para associação

export class Categoria extends Model<
    InferAttributes<Categoria>,
    InferCreationAttributes<Categoria>
> implements ICategoria {

    declare id: CreationOptional<number>;
    declare nome: string;

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
    },
    {
        sequelize,
        tableName: 'categorias',
        timestamps: false,
    }
);