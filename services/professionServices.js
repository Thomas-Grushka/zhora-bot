import { Op } from "sequelize";

import Profession from "../db/models/Profession.js";

export const getProffessionByScope = scope => Profession.findAll({
    where: {
        scopes: {
            [Op.contains]: [scope]
        }
    }
});