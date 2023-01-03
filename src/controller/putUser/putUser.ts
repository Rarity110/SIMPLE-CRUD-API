import http from 'http';

import {
	parseResponseBody,
	parseURL,
	sendResponse,
	isValidateUserData,
	isUuid,
	//@ts-ignore
} from '../../utils.ts';
//@ts-ignore
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts.ts';
//@ts-ignore
import { putUserByID } from '../../dataBase.ts';
//@ts-ignore
import { IUser, IUserData } from '../../interfaces.ts';

const putUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const id: string = await parseURL(req);
	const userData: IUserData | null = await parseResponseBody(req);

	if (!userData) {
		sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_PUT);
		return;
	}

	if (!isUuid(id)) {
		sendResponse(res, RESPONSE_CODES.NOT_UUID, RESPONSE_MESSAGES.NOT_UUID);
		return;
	}

	if (!isValidateUserData(userData as IUser)) {
		sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_PUT);
		return;
	}

	const user = putUserByID(id, userData as IUserData);

	if (!user) {
		sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_USER);
		return;
	}

	sendResponse(res, RESPONSE_CODES.OK_PUT, user);
	return;
};

export default putUser;
