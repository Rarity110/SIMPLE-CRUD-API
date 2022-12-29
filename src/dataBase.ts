import { v4 as uuid } from "uuid";

interface IUser {
    id: string,
    username: string,
    age: number, 
    hobbies: string[] 
};

let users: IUser[] = [];

const createUser = (user: IUser) => ({
    id: uuid(),
    username: user.username,
    age: user.age,
    hobbies: user.hobbies
});

const getAllUsers = () => {
    return [...users]
};

const getUsersByID = (id: string) => {
    const user = users.filter((item) => item.id === id)[0];
    return user ? user : null;
};

const postUser = (userData: IUser ) => {
    const user = createUser(userData)
    users = [...users, user];
    return user;
};

export { getAllUsers, getUsersByID, postUser, IUser };