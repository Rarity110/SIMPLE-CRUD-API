import http from 'http';
//@ts-ignore
import { parseURL, sendResponse, isUuid } from '../../utils.ts';
//@ts-ignore
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts.ts';
//@ts-ignore
import { getUsersByID } from '../../dataBase.ts';

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
