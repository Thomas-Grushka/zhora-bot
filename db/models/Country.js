import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Country = sequelize.define(
    "country",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }
);

// Country.sync({force: true});

export default Country;