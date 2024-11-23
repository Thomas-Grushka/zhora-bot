import City from "../db/models/City.js";

export const addCity = payload => City.create(payload);

export const getCitiesByCountry = countryId => City.findAll({
    where: {
        countryId,
        parentCityId: null,
    },
});

export const getSubCities = (parentCityId)=> City.findAll({
    where: {
        parentCityId,
    }
});

export const getCityById = id => City.findByPk(id);