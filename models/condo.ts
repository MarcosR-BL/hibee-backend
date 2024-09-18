import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Plan from "./plans";
import Apartment from "./apartment";
import Tower from "./towers";
import File, { fileDBInterface } from "./files";
export interface CondoInterface extends Model<InferAttributes<CondoInterface>, InferCreationAttributes<CondoInterface>> {
    id?: CreationOptional<number>;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    type_aptm: string;
    status: string;
    time_zone: string;
    plan_id: number;
    end_subscription: CreationOptional<Date>;
    next_payment: CreationOptional<Date>;
    last_payment: CreationOptional<Date>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    code_register?: CreationOptional<string>;
    logo_id: CreationOptional<number>;
    file?: fileDBInterface
}

const Condo = db.define<CondoInterface>('condos', {
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
    },
    code_register: {
        type: DataTypes.STRING
    },
    logo_id: {
        type: DataTypes.NUMBER
    }
});

Condo.afterCreate(async (condo: CondoInterface) => {
    const tower_a = await Tower.create({ name: 'admin', condo_id: condo.id, type: 'admin' });
    const tower_e = await Tower.create({ name: 'empleados', condo_id: condo.id, type: 'employee' });
    const tower_v = await Tower.create({ name: 'vigilancia', condo_id: condo.id, type: 'surveillance' });

    await Apartment.create({ name: "admin depto", status: 'available', condo_id: condo.id, phone: "", torre_id: tower_a.id });
    await Apartment.create({ name: "empleados depto", status: 'available', condo_id: condo.id, phone: "", torre_id: tower_e.id });
    await Apartment.create({ name: "vigilancia depto", status: 'available', condo_id: condo.id, phone: "", torre_id: tower_v.id });
});

Condo.belongsTo(Plan, { foreignKey: 'plan_id' });
Plan.hasMany(Condo, { foreignKey: 'plan_id' });

Condo.belongsTo(File, { foreignKey: 'logo_id' });
File.hasOne(Condo, { foreignKey: 'logo_id' });


export default Condo;

