import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import bcrypt from 'bcrypt';
import UserSessions from "./user_session";


interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<number>;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    language: string;
}


const User = db.define<User>('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    }
});

User.hasMany(UserSessions,{ foreignKey: 'user_id' });

User.beforeCreate(async (user: any) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default User;

