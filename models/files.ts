import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db/connection";
import Tower from "./towers";

export interface fileDBInterface extends Model<InferAttributes<fileDBInterface>, InferCreationAttributes<fileDBInterface>> {
    id?: CreationOptional<number>;
    name: string;
    url: string;
    type: string;
    section: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}

const File = db.define<fileDBInterface>('files', {
    name: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING
    },
    section: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
});



export default File;

