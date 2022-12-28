import { getAllUsers, getUsersByID, postUser, IUser  } from "./dataBase.js";
import http from 'http';
import { Buffer } from 'buffer';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';

const parseResponseBody = async (req: http.IncomingMessage) => {
        const buffers = []; 

        for await (const chunk of req) {
            buffers.push(chunk);
        }
    
        const data = Buffer.concat(buffers).toString();
        return JSON.parse(data);
};

const sendResponse = (res: http.ServerResponse<http.IncomingMessage>, code: number, response: IUser[] | string) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
};

const customRouter = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {

    if (req.url === ENDPOINT && req.method === REQUEST_METHODS.GET) {
        try {
            const allUsers = getAllUsers();
            sendResponse(res, RESPONSE_CODES.OK_GET, allUsers);
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end('Server error');
        }
        
    } 

    if (req.method === REQUEST_METHODS.POST) {
        try {
            const user = await parseResponseBody(req);
            const users = postUser(user);
            sendResponse(res, RESPONSE_CODES.OK_POST, user);
        } catch (error) {
            console.log(error);
        }
        
    }

    // if (id && method === 'GET') {
    //     try {
    //         const response = getUsersByID(id);
    //         if (response) {
    //             res.writeHead(200, { "Content-Type": "application/json" });
    //             res.end(JSON.stringify(response));
    //         } else {
    //             res.writeHead(404, { "Content-Type": "application/json" });
    //             res.end(`User ${id} not found`);
    //         }
           
    //     } catch (error) {
    //         res.writeHead(400, { "Content-Type": "application/json" });
    //         res.end('Bad Request');
    //     }
        
    // };
   
};

export default customRouter;
