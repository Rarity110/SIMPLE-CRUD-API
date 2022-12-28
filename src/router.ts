import { getAllUsers, getUsersByID, postUser  } from "./dataBase.js";
import http from 'http';

const parseURL = async (req: http.IncomingMessage): Promise<string> => 
    new Promise((res, rej) => {
        
        let str = "";
        req.on("data", (data) => {
          str += res(Buffer.from(data).toString());
          console.log(str);
          
        });
      
        req.on("end", () => {
          if (str) {
            res(str);
          } else {
            rej("error");
          }
        });
      
        req.on("error", () => rej("error"));
      });

   
   
    // const parsedUrl = url.slice(1).split('/');  
    // if (parsedUrl.length === 1 && parsedUrl[0].toLowerCase() === 'users') {
    //     return '';
    // } else if (parsedUrl.length === 2 && parsedUrl[0].toLowerCase() === 'users') {
    //     const id = parsedUrl[1].toLowerCase()
    //     return id;
    // } else {
    //     return undefined;
    // }
   

const customRouter = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
    // const id = parseURL(url);

    if (req.url === '/users' && req.method === 'GET') {
        try {
            const response = getAllUsers();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end('Server error');
        }
        
    } 
    if (req.method === 'POST') {
        
        try {
                        const data = await parseURL(req);
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            res.writeHead(200, { "Content-Type": "text" });
            res.end('yes');
        } catch (error) {
            console.log('no');
            
        }
    }
    // }

    

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