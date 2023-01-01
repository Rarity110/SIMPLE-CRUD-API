import { IncomingMessage, ServerResponse } from 'http';
import { ENDPOINT } from './consts.js';
import { IUser, IUserData } from './interfaces.js';
import { validate as uuidValidate, version as uuidVersion  } from "uuid";

const parseResponseBody = async (req: IncomingMessage) => {
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

const parseURL =async (req: IncomingMessage) => {
   const url = req.url as string;
   const id = url.replace(`${ENDPOINT}/`, '');
   return id;
}

const sendResponse = (res: ServerResponse<IncomingMessage>, code: number, response: IUser[] | string |  IUser) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
};

const isValidateUser = (user: IUser) => {
    return (user && user.username && user.age && user.hobbies);
};

const isValidateUserData = (user: IUserData) => {
    return (user && (user.username || user.age || user.hobbies));
};

const isUuid = (id: string) => {
    return uuidValidate(id) && uuidVersion(id) === 4;
}

export { parseResponseBody, parseURL, sendResponse, isValidateUser, isValidateUserData, isUuid };