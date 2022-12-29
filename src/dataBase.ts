import { v4 as uuid } from "uuid";

interface IUser {
    id: string,
    username: string,
    age: number, 
    hobbies: string[] 
};

type KeysOfIUser = 'username' | 'age' | 'hobbies';

interface IUserData {
    username?: string,
    age?: number, 
    hobbies?: string[] 
}

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

const putUserByID = (id: string, userData: IUserData) => {
    const ind = users.findIndex((item) => item.id === id);
    if (ind !== -1) {
        const user = users[ind];
        users[ind] = {...user, ...userData};
        return users[ind];
    } else {
        return null;
    }
};

export { getAllUsers, getUsersByID, postUser, putUserByID, IUser, IUserData };