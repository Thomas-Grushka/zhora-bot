import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Profession = sequelize.define(
    "profession",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataMarker: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        scopes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        }
    }
);

// Profession.sync({force: true});

export default Profession;