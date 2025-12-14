import {
    Model,
    DataTypes,
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../utils/sequelize';
import { IAdmin } from '../interface/Admin';
import * as bcrypt from 'bcrypt';

export class Admin extends Model<
    InferAttributes<Admin>,
    InferCreationAttributes<Admin>
> implements IAdmin {

    declare id: CreationOptional<number>;
    declare usuario: string;
    declare senha: string;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.senha);
    }
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario: {
            type: new DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'admin',
        timestamps: false,
        hooks: {
            beforeCreate: async (admin: Admin) => {
                const salt = await bcrypt.genSalt(10);
                admin.senha = await bcrypt.hash(admin.senha, salt);
            },
            beforeUpdate: async (admin: Admin) => {
                if (admin.changed('senha')) {
                    const salt = await bcrypt.genSalt(10);
                    admin.senha = await bcrypt.hash(admin.senha, salt);
                }
            },
        },
    }
);