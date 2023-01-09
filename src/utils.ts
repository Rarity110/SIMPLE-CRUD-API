import { IncomingMessage, ServerResponse } from 'http';
import { ENDPOINT } from './consts';
import { IUser, IUserData } from './interfaces';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

const parseResponseBody = async (req: IncomingMessage): Promise<IUserData | null> => {
	const buffers = [];

	for await (const chunk of req) {
		buffers.push(chunk);
	}

	const data = Buffer.concat(buffers).toString();
	try {
		return JSON.parse(data);
	} catch (error) {
		return null;
	}
};

const parseURL = async (req: IncomingMessage): Promise<string> => {
	const url = req.url as string;
	const id = url.replace(`${ENDPOINT}/`, '');
	return id;
};

const sendResponse = (
	res: ServerResponse<IncomingMessage>,
	code: number,
	response: IUser[] | string | IUser,
): void => {
	res.writeHead(code, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(response));
};

const isValidateUser = (user: IUser): '' | 0 | string[] => {
	return user && user.username && user.age && user.hobbies;
};

const isValidateUserData = (user: IUserData): string | number | string[] | undefined => {
	return user && (user.username || user.age || user.hobbies);
};

const isUuid = (id: string): boolean => {
	return uuidValidate(id) && uuidVersion(id) === 4;
};

export { parseResponseBody, parseURL, sendResponse, isValidateUser, isValidateUserData, isUuid };
