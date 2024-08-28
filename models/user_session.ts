import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Condo, { CondoInterface } from "./condo";
import User, { UserInterface } from "./user";
import Apartment from "./apartment";

export interface UserSessionsInterface extends Model<InferAttributes<UserSessionsInterface>, InferCreationAttributes<UserSessionsInterface>> {
    id: CreationOptional<number>;
    user_type: string;
    condo_id: number;
    apartment_id: number;
    user_id: number;
    status: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    condo?: CondoInterface;
    user?: UserInterface;
}

const UserSessions = db.define<UserSessionsInterface>('user_sessions', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    user_type: {
        type: DataTypes.ENUM('admin', 'employee', 'resident', 'guard')
    },
    condo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Condo,
            key: "condo_id"
        }
    },
    apartment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "apartment_id"
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "user_id"
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'deleted', 'inactive')
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

Condo.hasOne(UserSessions, { foreignKey: 'condo_id' });
UserSessions.belongsTo(Condo, { foreignKey: 'condo_id' });

Apartment.hasOne(UserSessions, { foreignKey: 'apartment_id' });
UserSessions.belongsTo(Apartment, { foreignKey: 'apartment_id' });

export default UserSessions;

