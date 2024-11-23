import User from "../db/models/User.js";

export const addUser = payload => User.create(payload);

export const findUser = query => User.findOne({
    where: query,
})

export const updateUser = async (query, data) => {
    const user = await findUser(query);
    if(!user) {
        return null;
    }
    return user.update(data, {
        returning: true,
    });
}
