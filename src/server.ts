import http from 'http';
//@ts-ignore
import customRouter from './router.ts';
//@ts-ignore
import { ENDPOINT, RESPONSE_CODES, RESPONSE_MESSAGES } from './consts.ts';


//@ts-ignore
import { sendResponse } from './utils.ts';

const server = http.createServer(async (req, res) => {
	try {
		if (!req.url) {
			sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_PAGE);
			return;
		}

		if (!req.method) {
			sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.INVALID_METHOD);
			return;
		}

		if (req.url && !req.url.startsWith(ENDPOINT)) {
			sendResponse(res, RESPONSE_CODES.NOT_FOUND, RESPONSE_MESSAGES.NOT_FOUND_PAGE);
			return;
		}

		await customRouter(req, res);
	} catch (error) {
		sendResponse(res, RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.SERVER_ERROR);
	}
});

export default server;
