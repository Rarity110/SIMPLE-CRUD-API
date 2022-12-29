import { v4 as uuid } from "uuid";

interface IUser {
    id: string,
    username: string,
    age: number, 
    hobbies: string[] 
};

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
    const user = users.filter((item) => item.id === id)[0];
    if (user) {
        for (const key in userData ) {
            console.log(key);
            
        }
    }
    return user ? user : null;
};

export { getAllUsers, getUsersByID, postUser, putUserByID, IUser, IUserData };