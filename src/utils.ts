import http from 'http';
import { ENDPOINT } from './consts.js';
import { IUser  } from "./dataBase.js";


const parseResponseBody = async (req: http.IncomingMessage) => {
    const buffers = []; 

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    try {
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
};

const parseURL =async (req: http.IncomingMessage) => {
   const url = req.url as string;
   const id = url.replace(`${ENDPOINT}/`, '');
   return id;
}

const sendResponse = (res: http.ServerResponse<http.IncomingMessage>, code: number, response: IUser[] | string |  IUser) => {
res.writeHead(code, { "Content-Type": "application/json" });
res.end(JSON.stringify(response));
};

export { parseResponseBody, parseURL, sendResponse };