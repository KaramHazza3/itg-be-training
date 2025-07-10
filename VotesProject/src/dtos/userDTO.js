export const createUserDTO = (user) => {
    const { pasword, ...userDTO } = user.dataValues;
    return userDTO;
}