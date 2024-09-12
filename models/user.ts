import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import bcrypt from 'bcrypt';
import UserSessions, { UserSessionsInterface } from "./user_session";

export interface UserInterface extends Model<InferAttributes<UserInterface>, InferCreationAttributes<UserInterface>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: CreationOptional<number>;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    language: string;
    createdAt : CreationOptional<Date>;
    updatedAt : CreationOptional<Date>;
    user_sessions?: UserSessionsInterface[];
}


const User = db.define<UserInterface>('users', {
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
    },
    createdAt:{
        type: DataTypes.DATE
    },
    updatedAt:{
        type: DataTypes.DATE
    }
});

User.hasMany(UserSessions,{ foreignKey: 'user_id' });
UserSessions.belongsTo(User, { foreignKey: 'user_id' });


User.beforeCreate(async (user: UserInterface) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default User;

