import { IUser } from './interfaces';

let users: IUser[] = [];

const updateUsers = (usersNew: IUser[]): void => {
	users = usersNew;
};

export { users, updateUsers };
