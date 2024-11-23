import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Scope = sequelize.define(
    "scope",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataMarker: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

// Scope.sync({force: true});

export default Scope;