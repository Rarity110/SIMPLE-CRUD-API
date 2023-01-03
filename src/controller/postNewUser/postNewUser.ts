import http from 'http';
//@ts-ignore
import { parseResponseBody, sendResponse, isValidateUser } from '../../utils.ts';
//@ts-ignore
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts.ts';
//@ts-ignore
import { postUser } from '../../dataBase.ts';
//@ts-ignore
import { IUser } from '../../interfaces.ts';

const postNewUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const userData: IUser | null = await parseResponseBody(req);
	if (!userData || !isValidateUser(userData as IUser)) {
		sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_POST);
		return;
	}

	const user = postUser(userData as IUser);

	sendResponse(res, RESPONSE_CODES.OK_POST, user);
	return;
};

export default postNewUser;
