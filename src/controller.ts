import { v4 as uuid } from "uuid";
import http from 'http';
import { parseResponseBody, parseURL, sendResponse } from './utils.js';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';
import { getAllUsers, getUsersByID, postUser, IUser, IUserData, putUserByID } from './dataBase.js';

const isValidateUser = (user: IUser) => {
    return (user && user.username && user.age && user.hobbies);
}

const isValidateUserData = (user: IUserData) => {
    return (user && (user.username || user.age || user.hobbies));
}

const postNewUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const userData: IUser | null = await parseResponseBody(req);
    if (!userData || !isValidateUser(userData as IUser)) {
        sendResponse(res, RESPONSE_CODES.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST_POST);
        return; 
    }
    
    const user = postUser(userData as IUser)
    sendResponse(res, RESPONSE_CODES.OK_POST, user);
    return;
};

const getUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const id: string = await parseURL(req);
    const user = getUsersByID(id);
    if (user) {
        sendResponse(res, RESPONSE_CODES.OK_GET, user);
        return;
    }
    if (!user) {
        sendResponse(res, RESPONSE_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_USER);
        return;
    }
};

const putUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const id: string = await parseURL(req);
    const userData: IUserData | null = await parseResponseBody(req);

    if (!userData || !isValidateUserData(userData as IUser)) {
        sendResponse(res, RESPONSE_CODES.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST_PUT);
        return; 
    }
    
    const user = putUserByID(id, userData as IUserData)
    sendResponse(res, RESPONSE_CODES.OK_POST, 'user');
    return;
};

export { postNewUser, getUser, putUser };