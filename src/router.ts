import { getAllUsers, getUsersByID, postUser, IUser  } from "./dataBase.js";
import http from 'http';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';
import { parseResponseBody, sendResponse } from './utils.js';
import { postNewUser, getUser, putUser } from "./controller.js";


const customRouter = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

    if (req.method === REQUEST_METHODS.GET) {
        if (req.url === ENDPOINT) {
            try {
                const allUsers = getAllUsers();
                sendResponse(res, RESPONSE_CODES.OK_GET, allUsers);
            } catch (error) {
                sendResponse(res, RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
            }
            
        } else {
            try {
                await getUser(req, res);
            } catch (error) {
                sendResponse(res, RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
            }
        }
    }

    if (req.method === REQUEST_METHODS.POST) {
        try {
            await postNewUser(req, res);
            
        } catch (error) {
            sendResponse(res, RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
        }
        
    }

    if (req.method === REQUEST_METHODS.PUT) {
        try {
            await putUser(req, res);
            
        } catch (error) {
            sendResponse(res, RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
        }
        
    }
   
};

export default customRouter;
