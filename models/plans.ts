import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Condo from "./condo";

export interface PlansInterface extends Model<InferAttributes<PlansInterface>, InferCreationAttributes<PlansInterface>> {
    id: CreationOptional<number>;
    name: string;
    cost: number;
    description: string;
    max_apartments: number;
    max_admins: number;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Plan = db.define<PlansInterface>('plans', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        type: DataTypes.STRING
    },
    cost: {
        type: DataTypes.DOUBLE,
    },
    description: {
        type: DataTypes.STRING
    },
    max_apartments: {
        type: DataTypes.INTEGER
    },
    max_admins: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});


export default Plan;

