import http from 'http';
import { sendResponse } from '../../utils';
import { RESPONSE_CODES } from '../../consts';
import { getAllUsers } from '../../service/service';

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
