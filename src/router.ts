import { getAllUsers, getUsersByID, postUser  } from "./dataBase.js";
import http from 'http';

const parseURL = (url: string) => {
    const parsedUrl = url.slice(1).split('/');  
    if (parsedUrl.length === 1 && parsedUrl[0].toLowerCase() === 'users') {
        return '';
    } else if (parsedUrl.length === 2 && parsedUrl[0].toLowerCase() === 'users') {
        const id = parsedUrl[1].toLowerCase()
        return id;
    } else {
        return undefined;
    }
};

const customRouter = async (url: string, method: string, res: http.ServerResponse<http.IncomingMessage>, req: http.IncomingMessage) => {
    const id = parseURL(url);

    if (!id && method === 'GET') {
        try {
            const response = getAllUsers();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end('Server error');
        }
        
    };

    if (id && method === 'GET') {
        try {
            const response = getUsersByID(id);
            if (response) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(response));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(`User ${id} not found`);
            }
           
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end('Bad Request');
        }
        
    };


    // if (method === 'POST' && !id ) {
    //     res.statusCode = 201;
    //     res.end('post');
    // };

    // if (method === 'PUT' && id ) {
    //     res.statusCode = 200;
    //     res.end('put');
    // };

    // if (method === 'DELETE' && id ) {
    //     res.statusCode = 204;
    //     res.end('delete');
    // };
   
};

export default customRouter;