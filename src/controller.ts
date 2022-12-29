import { v4 as uuid } from "uuid";
import http from 'http';
import { parseResponseBody, parseURL, sendResponse } from './utils.js';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';
import { getAllUsers, getUsersByID, postUser, IUser, IUserData, putUserByID, deleteUserByID } from './dataBase.js';

const isValidateUser = (user: IUser) => {
    return (user && user.username && user.age && user.hobbies);
}

const isValidateUserData = (user: IUserData) => {
    return (user && (user.username || user.age || user.hobbies));
}

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
    
    const user = putUserByID(id, userData as IUserData);
    if (!user) {
        sendResponse(res, RESPONSE_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_USER);
        return; 
    }

    sendResponse(res, RESPONSE_CODES.OK_PUT, user);
    return;
};

const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> ) => {
    const id: string = await parseURL(req);

    if (!id) {
        sendResponse(res, RESPONSE_CODES.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST_DELETE);
        return; 
    }
    
    const isDeleted = deleteUserByID(id);

    if (await isDeleted) {
        sendResponse(res, RESPONSE_CODES.OK_DELETE, ERROR_MESSAGES.OK_DELETE);
        return; 
    } else { 
        sendResponse(res, RESPONSE_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_DELETE);
        return; 
    }
};

export { getUsers, postNewUser, getUser, putUser, deleteUser };