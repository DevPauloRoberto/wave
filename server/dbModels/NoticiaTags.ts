import {
    Model,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { INoticiaTags } from '../interface/NoticiaTags';

export class NoticiaTags extends Model<
    InferAttributes<NoticiaTags>,
    InferCreationAttributes<NoticiaTags>
> implements INoticiaTags {
    declare idNoticia: ForeignKey<number>;
    declare idTag: ForeignKey<number>;
}

NoticiaTags.init(
    {
        idNoticia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'noticia',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        idTag: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'tags',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    {
        sequelize,
        tableName: 'noticia_tags',
        timestamps: false,
    }
);