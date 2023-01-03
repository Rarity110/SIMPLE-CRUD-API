import http from 'http';
//@ts-ignore
import { sendResponse } from '../../utils.ts';
//@ts-ignore
import { RESPONSE_CODES } from '../../consts.ts';
//@ts-ignore
import { getAllUsers } from '../../dataBase.ts';

const getUsers = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const users = getAllUsers();
	if (users) {
		sendResponse(res, RESPONSE_CODES.OK_GET, users);
		return;
	}
};

export default getUsers;
