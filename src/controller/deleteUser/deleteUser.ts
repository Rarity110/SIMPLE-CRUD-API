import http from 'http';
//@ts-ignore
import { parseURL, sendResponse, isUuid } from '../../utils.ts';
//@ts-ignore
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts.ts';
//@ts-ignore
import { deleteUserByID } from '../../dataBase.ts';

const deleteUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const id: string = await parseURL(req);

	if (!id) {
		sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_DELETE);
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
		sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_DELETE);
		return;
	}
};

export default deleteUser;
