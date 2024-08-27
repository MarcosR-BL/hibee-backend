import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";

interface UserSessions extends Model<InferAttributes<UserSessions>, InferCreationAttributes<UserSessions>> {
    id: CreationOptional<number>;
    user_type: string;
    condo_id: number;
    apartment_id: number;
    user_id: number;
    status: string;
}

const UserSessions = db.define<UserSessions>('user_sessions',{
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    user_type : {
        type : DataTypes.ENUM('admin','employee','resident','guard')
    },
    condo_id : {
        type : DataTypes.INTEGER
    },
    apartment_id : {
        type : DataTypes.INTEGER
    },
    user_id : {
        type : DataTypes.INTEGER
    },
    status : {
        type : DataTypes.ENUM('active','deleted','inactive')
    }
});


export default UserSessions;

