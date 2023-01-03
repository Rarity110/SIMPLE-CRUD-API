import { Server, IncomingMessage, ServerResponse } from "http";
//@ts-ignore
import server from "../../server.ts";
import request from 'supertest';

let application: Server<typeof IncomingMessage, typeof ServerResponse>;

beforeEach(async () => {
    jest.setTimeout(60000);
    application = server;
})

describe("Get users", () => {
    
    it('Server should answer with status code 200 and empty array', async () => {
        const res = await request(application).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    }, 60000);

    it('Server should answer with status code 200 and all users records', async () => {
        const user = await request(application).post('/api/users').send({
                username: "Rarity",
                age: "30",
                hobbies: ["chess"],
            });

        const id = user.body.id;
    
        const res = await request(application).get(`/api/users`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{
            username: "Rarity",
            age: "30",
            hobbies: ["chess"],
            id: id
        }]);
        
    }, 60000);
     
})

afterEach(async () => {
    application.close();
});