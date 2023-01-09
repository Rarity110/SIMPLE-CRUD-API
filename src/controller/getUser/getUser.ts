import http from 'http';
import { parseURL, sendResponse, isUuid } from '../../utils';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts';
import { getUsersByID } from '../../dataBase';

const getUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const id: string = await parseURL(req);

	if (!isUuid(id)) {
		sendResponse(res, RESPONSE_CODES.NOT_UUID, RESPONSE_MESSAGES.NOT_UUID);
		return;
	}

	const user = getUsersByID(id);

	if (!user) {
		sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_USER);
		return;
	}

	sendResponse(res, RESPONSE_CODES.OK_GET, user);
	return;
};

export default getUser;
