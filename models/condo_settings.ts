import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Condo from "./condo";

export interface CondoSettingsInterface extends Model<InferAttributes<CondoSettingsInterface>, InferCreationAttributes<CondoSettingsInterface>> {
    id: CreationOptional<number>;
    simbol_coin: string;
    name_coin: string;
    simbol_decimals: string;
    simbol_thousands: string;
    type_download_files: string;
    condo_id: number;
    coin: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const CondoSettings = db.define<CondoSettingsInterface>('condo_settings', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    simbol_coin: {
        type: DataTypes.STRING
    },
    name_coin: {
        type: DataTypes.STRING
    },
    simbol_decimals: {
        type: DataTypes.STRING
    },
    simbol_thousands: {
        type: DataTypes.STRING
    },
    type_download_files: {
        type: DataTypes.STRING
    },
    condo_id: {
        type: DataTypes.INTEGER
    },
    coin: {
        type: DataTypes.STRING
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

export default CondoSettings;

