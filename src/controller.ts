import http from 'http';
import { parseResponseBody, parseURL, sendResponse, isValidateUser, isValidateUserData, isUuid } from './utils.js';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from './consts.js';
import { getAllUsers, getUsersByID, postUser, IUser, IUserData, putUserByID, deleteUserByID } from './dataBase.js';

const getUsers = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const users = getAllUsers();
    if (users) {
        sendResponse(res, RESPONSE_CODES.OK_GET, users);
        return;
    }
};

const postNewUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const userData: IUser | null = await parseResponseBody(req);
    if (!userData || !isValidateUser(userData as IUser)) {
        sendResponse(res, RESPONSE_CODES.BAD_REQUEST, RESPONSE_MESSAGES.BAD_REQUEST_POST);
        return; 
    }
    
    const user = postUser(userData as IUser)
    sendResponse(res, RESPONSE_CODES.OK_POST, user);
    return;
};

const getUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
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

const putUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
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

const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
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

export { getUsers, postNewUser, getUser, putUser, deleteUser };