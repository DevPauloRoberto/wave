import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { ITag } from '../interface/Tag';
import { Noticia } from './Noticia';
import { NoticiaTags } from './NoticiaTags';

export class Tag extends Model<
    InferAttributes<Tag>,
    InferCreationAttributes<Tag>
> implements ITag {

    declare id: CreationOptional<number>;
    declare nome: string;

    public static associate() {
        Tag.belongsToMany(Noticia, {
            through: NoticiaTags,
            foreignKey: 'idTag',
            as: 'noticias',
        });
    }
}

Tag.init(
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
        tableName: 'tags',
        timestamps: false,
    }
);