import UserVacancy from "../db/models/UserVacancy.js";

export const getVacanciesByUser = userId => UserVacancy.findAll({
    where: {
        userId
    },
    attributes: ['resourceId']
});

export const addVacancy = data => UserVacancy.create(data);




