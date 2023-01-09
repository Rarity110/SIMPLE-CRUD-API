import http from 'http';
import { parseURL, sendResponse, isUuid } from '../../utils';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts';
import { deleteUserByID } from '../../dataBase';

const deleteUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const id: string = await parseURL(req);

	if (!id) {
		sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_REQUARED_ID);
		return;
	}

	if (!isUuid(id)) {
		sendResponse(res, RESPONSE_CODES.NOT_UUID, RESPONSE_MESSAGES.NOT_UUID);
		return;
	}

	const isDeleted = deleteUserByID(id);

	if (await isDeleted) {
		sendResponse(res, RESPONSE_CODES.OK_DELETE, RESPONSE_MESSAGES.OK_DELETE);
		return;
	} else {
		sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_USER);
		return;
	}
};

export default deleteUser;
