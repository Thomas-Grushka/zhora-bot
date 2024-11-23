import Country from "../db/models/Country.js";

export const addCountry = payload => Country.create(payload);

export const getAllCountries = ()=> Country.findAll({
    order: [
        ['id', 'ASC'],
    ],
});