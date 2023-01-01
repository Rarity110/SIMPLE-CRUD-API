import http from 'http';
import customRouter from './router.js';
import { ENDPOINT, RESPONSE_CODES, RESPONSE_MESSAGES, REQUEST_METHODS } from './consts.js';
import { sendResponse } from './utils.js';
import { config } from 'dotenv';


const PORT = config().parsed?.PORT ? config().parsed?.PORT : 4000;

const server = http.createServer(async (req, res) => {
    try {
        
        if (!req.url) {
            sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_PAGE);
            return;
        };
        
        if (!req.method ) {
            sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.INVALID_METHOD);
            return;
        }

        if (req.url && !req.url.startsWith(ENDPOINT)) {
            sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_PAGE);
            return;
        };
        
        const router = await customRouter(req, res);
        
    } catch (error) {
        sendResponse(res, RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.SERVER_ERROR);
    }

});

server.listen(PORT, () => {
    console.log(`Сервер запущен на Localhost:${PORT}`);
})