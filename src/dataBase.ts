import { v4 as uuid } from "uuid";

interface IUser {
    id: string,
    username: string,
    age: number, 
    hobbies: string[] 
};

const createUser = (user: IUser) => ({
    id: uuid(),
    username: user.username,
    age: user.age,
    hobbies: user.hobbies
});


const users: IUser[] = [];

const getAllUsers = () => {
    return [...users]
};

const getUsersByID = (id: string) => {
    const user = users.filter((item) => item.id === id)[0];
    console.log(user);
    return user ? user : null;
};

const postUser = (user: IUser) => {
    return [...users, user];
};

export { getAllUsers, getUsersByID, postUser, IUser };