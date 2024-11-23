import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const City = sequelize.define(
    "city",
    {
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avito_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentCityId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }
);

// City.sync({force: true});

export default City;