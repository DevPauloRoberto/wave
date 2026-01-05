import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { IAutor } from '../interface/Autor';

export class Autor extends Model<
    InferAttributes<Autor>,
    InferCreationAttributes<Autor>
> implements IAutor {
    declare id: CreationOptional<number>;
    declare nome: string;
}

Autor.init(
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
        tableName: 'autores',
        timestamps: false,
    }
);