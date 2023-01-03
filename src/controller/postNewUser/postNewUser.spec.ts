import { Server, IncomingMessage, ServerResponse } from 'http';
//@ts-ignore
import server from '../../server.ts';
import request from 'supertest';

let application: Server<typeof IncomingMessage, typeof ServerResponse>;

beforeEach(async () => {
	jest.setTimeout(60000);
	application = server;
});

describe('Post user', () => {
	it('Server should answer with status code 201 and newly created record', async () => {
		const res = await request(application)
			.post('/api/users')
			.send({
				username: 'Rarity',
				age: '30',
				hobbies: ['chess'],
			});
		expect(res.statusCode).toBe(201);
		expect(res.body).toMatchObject({ username: 'Rarity' });
		expect(res.body).toMatchObject({ age: '30' });
		expect(res.body).toMatchObject({ hobbies: ['chess'] });
	}, 60000);

	it('Server should answer with status code 400 and corresponding message if request body does not contain required fields', async () => {
		const res = await request(application)
			.post('/api/users')
			.send({
				age: '30',
				hobbies: ['chess'],
			});
		expect(res.statusCode).toBe(400);
		expect(res.body).toEqual('Request body does not contain required fields');
	}, 60000);
});

afterEach(async () => {
	application.close();
});
