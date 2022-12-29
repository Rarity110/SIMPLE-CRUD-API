import http from 'http';
import customRouter from './router.js';
import { ENDPOINT, RESPONSE_CODES, ERROR_MESSAGES, REQUEST_METHODS } from './consts.js';
import { sendResponse } from './utils.js';

const port = 4000;

const server = http.createServer(async (req, res) => {
    try {
        const correctMethod = Object.keys(REQUEST_METHODS)[Object.values(REQUEST_METHODS).indexOf(req.method as unknown as REQUEST_METHODS)];
        
        if (!req.url) {
            sendResponse(res, RESPONSE_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_PAGE);
            return;
        };
        
        if (!req.method || !correctMethod ) {
            sendResponse(res, RESPONSE_CODES.NOT_FOUND, ERROR_MESSAGES.INVALID_METHOD);
            return;
        }
        
        const router = await customRouter(req, res);
        
    } catch (error) {
        sendResponse(res, RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
    }

});

server.listen(port, () => {
    console.log(`Сервер запущен на Localhost:${port}`);
})