import { Server, IncomingMessage, ServerResponse } from "http";
//@ts-ignore
import server from "../../server.ts";
import request from 'supertest';

let application: Server<typeof IncomingMessage, typeof ServerResponse>;

beforeEach(async () => {
    jest.setTimeout(60000);
    application = server;
})

describe("Delete user", () => {
    
    it('Server should answer with status code 204 if the record is found and deleted', async () => {
       const user = await request(application).post('/api/users').send({
            username: "Rarity",
            age: "30",
            hobbies: ["chess"],
        });

        expect(user.body).toMatchObject({username: "Rarity"});
        expect(user.body).toMatchObject({age: "30"});
        expect(user.body).toMatchObject({hobbies: ["chess"]});

        const id = user.body.id;

        const res = await request(application).delete(`/api/users/${id}`);
        expect(res.statusCode).toBe(204);
       
    }, 60000);

    it('Server should answer with status code 400 if id was not written', async () => {
         const res = await request(application).delete('/api/users/');
         expect(res.statusCode).toBe(400);
         expect(res.body).toEqual('UserId is invalid (not uuid)')
        
     }, 60000);

    it('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
        const user = await request(application).post('/api/users').send({
                username: "Rarity",
                age: "30",
                hobbies: ["chess"],
            });
    
        expect(user.body).toMatchObject({username: "Rarity"});
        expect(user.body).toMatchObject({age: "30"});
        expect(user.body).toMatchObject({hobbies: ["chess"]});

        const id = user.body.id;

        const res = await request(application).delete(`/api/users/${id}asd`);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual('UserId is invalid (not uuid)')
        
    }, 60000);

    it('Server should answer with status code 404 and corresponding message if record with id === userId does not exist', async () => {
        const user = await request(application).post('/api/users').send({
             username: "Rarity",
             age: "30",
             hobbies: ["chess"],
         });
 
         expect(user.body).toMatchObject({username: "Rarity"});
         expect(user.body).toMatchObject({age: "30"});
         expect(user.body).toMatchObject({hobbies: ["chess"]});
 
         const id = user.body.id;
 
         await request(application).delete(`/api/users/${id}`);
         
         const res = await request(application).delete(`/api/users/${id}`);
         expect(res.statusCode).toBe(404);
         expect(res.body).toEqual('User not found')

        
     }, 60000);
     
})

afterEach(async () => {
    application.close();
});
