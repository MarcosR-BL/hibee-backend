import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";

export interface ApartmentInterface extends Model<InferAttributes<ApartmentInterface>, InferCreationAttributes<ApartmentInterface>> {
    id: CreationOptional<number>;
    name: string;
    phone: string;
    status: string;
    condo_id: number;
    torre_id: number;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const Apartment = db.define<ApartmentInterface>('apartments', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('available','not-available','decommissioned')
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

export default Apartment;

