import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const UserVacancy = sequelize.define(
    "user_vacancy",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        resource: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resourceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        employer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publishCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    }
);

// UserVacancy.sync({force: true});

export default UserVacancy;