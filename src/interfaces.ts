interface IUser {
	id: string;
	username: string;
	age: number;
	hobbies: string[];
}

interface IUserData {
	username?: string;
	age?: number;
	hobbies?: string[];
}

export type { IUser, IUserData };
