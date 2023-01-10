import http from 'http';
import customRouter from './router';
import { ENDPOINT, RESPONSE_CODES, RESPONSE_MESSAGES } from './consts';
import { sendResponse } from './utils';
import { env } from 'node:process';
import cluster from 'node:cluster';
import { users } from './dataBase';

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

		if (env.MODE === 'multi') {
			cluster.worker?.send({ users: users });
		}
	} catch (error) {
		sendResponse(res, RESPONSE_CODES.SERVER_ERROR, RESPONSE_MESSAGES.SERVER_ERROR);
	}
});

export default server;
