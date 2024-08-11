import { DataTypes } from "sequelize";
import db from "../db/connection";
import bcrypt from 'bcrypt';

const User = db.define('User',{
    first_name : {
        type : DataTypes.STRING
    },
    last_name : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    }
});

User.beforeCreate(async (user : any) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

export default User;

