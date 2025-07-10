export const UserDTO = (user) => {
    const { password, updatedAt, ...userDTO } = user.dataValues;
    return userDTO;
}