import { IncomingMessage, ServerResponse } from 'http';
//@ts-ignore
import { ENDPOINT, RESPONSE_CODES, RESPONSE_MESSAGES, REQUEST_METHODS } from './consts.ts';
//@ts-ignore
import { sendResponse } from './utils.ts';
//@ts-ignore
import { getUsers, postNewUser, getUser, putUser, deleteUser } from "./controller/index.ts";


const customRouter = async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    try {
        switch (req.method) {

            case REQUEST_METHODS.GET:
                if (req.url === ENDPOINT) {
                    await getUsers(req, res);
                } else {
                    await getUser(req, res);
                }
                break;

            case REQUEST_METHODS.POST:
                await postNewUser(req, res);
                break;

            case REQUEST_METHODS.PUT:
                await putUser(req, res);
                break;

            case REQUEST_METHODS.DELETE:
                await deleteUser(req, res);
                break;

            default:
                sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.INVALID_METHOD);
                break;
        }
        
    } catch (error) {
        sendResponse(res, RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.SERVER_ERROR);
    }

};

export default customRouter;
