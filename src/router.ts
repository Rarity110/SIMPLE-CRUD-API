import http from 'http';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';
import { sendResponse } from './utils.js';
import { getUsers, postNewUser, getUser, putUser, deleteUser } from "./controller.js";


const customRouter = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    try {
        if (req.method === REQUEST_METHODS.GET) {
            if (req.url === ENDPOINT) {
                await getUsers(req, res);
            } else {
                await getUser(req, res);
            }
        };
    
        if (req.method === REQUEST_METHODS.POST) {
            await postNewUser(req, res);
        };
    
        if (req.method === REQUEST_METHODS.PUT) {
            await putUser(req, res);
        };
    
        if (req.method === REQUEST_METHODS.DELETE) {
            await deleteUser(req, res);
        };
        
    } catch (error) {
        sendResponse(res, RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
    }

};

export default customRouter;
