import { v4 as uuid } from 'uuid';
import { IUser, IUserData } from './interfaces';

let users: IUser[] = [];

const createUser = (user: IUser): IUser => ({
	id: uuid(),
	username: user.username,
	age: user.age,
	hobbies: user.hobbies,
});

const getAllUsers = (): IUser[] => {
	return [...users];
};

const getUsersByID = (id: string): IUser | null => {
	const user = users.filter((item) => item.id === id)[0];
	return user ? user : null;
};

const postUser = (userData: IUser): IUser => {
	const user = createUser(userData);
	users = [...users, user];
	return user;
};

const putUserByID = (id: string, userData: IUserData): IUser | null => {
	const ind = users.findIndex((item) => item.id === id);
	if (ind !== -1) {
		const user = users[ind];
		users[ind] = { ...user, ...userData };
		return users[ind];
	} else {
		return null;
	}
};

const deleteUserByID = async (id: string): Promise<boolean> => {
	const user = users.filter((item) => item.id === id)[0];

	if (user) {
		users = users.filter((item) => item.id !== id);
		return true;
	} else {
		return false;
	}
};

export { getAllUsers, getUsersByID, postUser, putUserByID, deleteUserByID };
