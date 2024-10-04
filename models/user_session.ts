import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Condo, { CondoInterface } from "./condo";
import { UserInterface } from "./user";
import Apartment from "./apartment";
import File, { fileDBInterface } from "./files";

export interface UserSessionsInterface extends Model<InferAttributes<UserSessionsInterface>, InferCreationAttributes<UserSessionsInterface>> {
    id?: CreationOptional<number>;
    user_type: string;
    condo_id: number;
    apartment_id: number;
    user_id: number;
    status: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    condo?: CondoInterface;
    user?: UserInterface;
    comite_member: boolean;
    profile_picture_id: number;
    file?: fileDBInterface
}

const UserSessions = db.define<UserSessionsInterface>('user_sessions', {
    user_type: {
        type: DataTypes.ENUM('admin', 'employee', 'resident', 'guard')
    },
    condo_id: {
        type: DataTypes.INTEGER,
    },
    apartment_id: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.ENUM('active', 'deleted', 'inactive')
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    comite_member: {
        type: DataTypes.BOOLEAN
    },
    profile_picture_id: {
        type: DataTypes.NUMBER
    }
});

Condo.hasOne(UserSessions, { foreignKey: 'condo_id' });
UserSessions.belongsTo(Condo, { foreignKey: 'condo_id' });

Apartment.hasOne(UserSessions, { foreignKey: 'apartment_id' });
UserSessions.belongsTo(Apartment, { foreignKey: 'apartment_id' });

UserSessions.belongsTo(File, { foreignKey: 'profile_picture_id' });
File.hasOne(UserSessions, { foreignKey: 'profile_picture_id' });

export default UserSessions;

