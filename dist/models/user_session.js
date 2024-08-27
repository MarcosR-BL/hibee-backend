"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const UserSessions = connection_1.default.define('user_sessions', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    user_type: {
        type: sequelize_1.DataTypes.ENUM('admin', 'employee', 'resident', 'guard')
    },
    condo_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    apartment_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'deleted', 'inactive')
    }
});
exports.default = UserSessions;
//# sourceMappingURL=user_session.js.map