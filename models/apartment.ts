import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Tower from "./towers";
export interface ApartmentInterface extends Model<InferAttributes<ApartmentInterface>, InferCreationAttributes<ApartmentInterface>> {
    id?: CreationOptional<number>;
    name: string;
    phone: string;
    status: string;
    condo_id: number;
    torre_id: CreationOptional<number>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Apartment = db.define<ApartmentInterface>('apartments', {
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('available', 'not-available', 'decommissioned')
    },
    condo_id: {
        type: DataTypes.INTEGER,
    },
    torre_id: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});

Tower.hasMany(Apartment, { foreignKey: 'torre_id' });
Apartment.belongsTo(Tower, { foreignKey: 'torre_id' });

export default Apartment;

