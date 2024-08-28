import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import CondoSettings from "./condo_settings";

export interface CondoInterface extends Model<InferAttributes<CondoInterface>, InferCreationAttributes<CondoInterface>> {
    id: CreationOptional<number>;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    type_aptm: string;
    status: string;
    time_zone: string;
    plan_id: number;
    end_subscription: Date;
    next_payment: Date;
    last_payment: Date;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Condo = db.define<CondoInterface>('condos', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    type_aptm: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('suscrited', 'canceled', 'pending', 'proof', 'suspended')
    },
    time_zone: {
        type: DataTypes.STRING
    },
    plan_id: {
        type: DataTypes.INTEGER
    },
    end_subscription: {
        type: DataTypes.DATE
    },
    next_payment: {
        type: DataTypes.DATE
    },
    last_payment: {
        type: DataTypes.DATE
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

Condo.hasOne(CondoSettings, { foreignKey: 'condo_id' });
CondoSettings.belongsTo(Condo, { foreignKey: 'condo_id' });


export default Condo;

