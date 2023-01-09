import http from 'http';
import { parseResponseBody, sendResponse, isValidateUser } from '../../utils';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../consts';
import { postUser } from '../../dataBase';
import { IUser, IUserData } from '../../interfaces';

const postNewUser = async (
	req: http.IncomingMessage,
	res: http.ServerResponse<http.IncomingMessage>,
): Promise<void> => {
	const userData: IUserData | null = await parseResponseBody(req);
	if (!userData || !isValidateUser(userData as IUser)) {
		sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_REQUARED_FIELDS);
		return;
	}

	const user = postUser(userData as IUser);

	sendResponse(res, RESPONSE_CODES.OK_POST, user);
	return;
};

export default postNewUser;
