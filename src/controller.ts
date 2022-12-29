import { v4 as uuid } from "uuid";
import http from 'http';
import { parseResponseBody, sendResponse } from './utils.js';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';
import { getAllUsers, getUsersByID, postUser, IUser } from './dataBase.js'

const isValidate = (user: IUser) => {
    return (user && user.username && user.age && user.hobbies);
}

const postNewUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const userData: IUser | null = await parseResponseBody(req);
    if (!userData || !isValidate(userData as IUser)) {
        sendResponse(res, RESPONSE_CODES.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST_POST);
        return; 
    }
    
    const user = postUser(userData as IUser)
    sendResponse(res, RESPONSE_CODES.OK_POST, user);
    return;
};

export { postNewUser };