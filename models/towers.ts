import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";

export interface TowerInterface extends Model<InferAttributes<TowerInterface>, InferCreationAttributes<TowerInterface>> {
    id: CreationOptional<number>;
    name: string;
    condo_id: number;
    type: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Tower = db.define<TowerInterface>('towers', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        type: DataTypes.STRING
    },
    condo_id: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.ENUM('admin', 'employee', 'resident', 'proof')
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

export default Tower;

